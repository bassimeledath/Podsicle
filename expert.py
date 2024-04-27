from llmsherpa.readers import LayoutPDFReader
from llama_index.core.schema import Document
from llama_index.core import VectorStoreIndex
from models import GeminiText


class Expert(GeminiText):
    def __init__(self, arxiv_link: str, model_name: str = 'gemini-pro'):
        super().__init__(model_name)
        self.arxiv_link = arxiv_link
        self.query_engine = self.create_vector_store()

    def create_vector_store(self):
        llmsherpa_api_url = "https://readers.llmsherpa.com/api/document/developer/parseDocument?renderFormat=all"
        pdf_reader = LayoutPDFReader(llmsherpa_api_url)
        doc = pdf_reader.read_pdf(self.arxiv_link)

        index = VectorStoreIndex([])
        for chunk in doc.chunks():
            index.insert(Document(text=chunk.to_context_text(), extra_info={}))
        return index.as_query_engine()

    def generate_completion(self, prompt: str) -> str:
        response = self.query_engine.query(prompt)
        return response
