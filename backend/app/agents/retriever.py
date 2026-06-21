"""
Lightweight retrieval over the knowledge base using scikit-learn-free TF-IDF
style scoring, so the project has zero extra infra dependency (no vector DB
required to run the chatbot). Swap this for pgvector + real embeddings later
if you want — the KNOWLEDGE_BASE shape stays the same.
"""

import math
import re
from collections import Counter
from typing import List

from app.agents.knowledge_base import KNOWLEDGE_BASE

_TOKEN_RE = re.compile(r"[a-z0-9]+")


def _tokenize(text: str) -> List[str]:
    return _TOKEN_RE.findall(text.lower())


class KnowledgeRetriever:
    """In-memory TF-IDF retriever — fine for a knowledge base this size.
    Builds its index once at startup."""

    def __init__(self, documents: List[dict] = KNOWLEDGE_BASE):
        self.documents = documents
        self._doc_tokens = [_tokenize(d["topic"] + " " + d["content"]) for d in documents]
        self._doc_freq = self._build_doc_freq()
        self._n_docs = len(documents)

    def _build_doc_freq(self) -> Counter:
        df = Counter()
        for tokens in self._doc_tokens:
            for term in set(tokens):
                df[term] += 1
        return df

    def _score(self, query_tokens: List[str], doc_tokens: List[str]) -> float:
        if not doc_tokens:
            return 0.0
        term_freq = Counter(doc_tokens)
        score = 0.0
        for term in query_tokens:
            if term not in term_freq:
                continue
            tf = term_freq[term] / len(doc_tokens)
            idf = math.log((self._n_docs + 1) / (self._doc_freq.get(term, 0) + 1)) + 1
            score += tf * idf
        return score

    def retrieve(self, query: str, top_k: int = 4) -> List[dict]:
        query_tokens = _tokenize(query)
        if not query_tokens:
            return self.documents[:top_k]

        scored = [
            (self._score(query_tokens, doc_tokens), doc)
            for doc_tokens, doc in zip(self._doc_tokens, self.documents)
        ]
        scored.sort(key=lambda x: x[0], reverse=True)

        # If nothing scored above zero, fall back to the core identity + services
        # docs so the agent always has something grounded to work with.
        top = [doc for score, doc in scored if score > 0][:top_k]
        if not top:
            fallback_ids = {"identity", "services", "availability"}
            top = [d for d in self.documents if d["id"] in fallback_ids]
        return top


retriever = KnowledgeRetriever()
