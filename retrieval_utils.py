import re
import arxiv
from llmsherpa.readers import LayoutPDFReader
from llama_index.readers.file import PyMuPDFReader
from llama_index.core.node_parser import SentenceSplitter
from llama_index.embeddings.openai import OpenAIEmbedding


def build_vector_store(doc):
    ''' Builds in-memory vector store using a document.
        - uses OpenAI embedding atm
    '''
    def embed_model():
        import os
        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
        return OpenAIEmbedding()

    node_parser = SentenceSplitter(chunk_size=512, chunk_overlap=50)
    nodes = node_parser.get_nodes_from_documents(doc)

    embed_model = embed_model()

    for node in nodes:
        node_embedding = embed_model.get_text_embedding(
            node.get_content(metadata_mode='all')
            )
        node.embedding = node_embedding

    index = VectorStoreIndex(nodes)
    return index


def get_arxiv_references(filepath) -> set:
    """ Returns set of all arXiv ids for references in the paper.
        - Uses LayoutPDF reader, so
        Necessarily limited to references that exist in arXiv.
    """
    doc = read_pdf_old(filepath)
    patterns = [r"\w+-\w+/\d{7}", r"\d{4}\.\d{4,5}"]

    refs = set()
    for pattern in patterns:
        [refs.add(item) for item in re.findall(pattern, doc.to_text())]
    return refs

    def read_pdf_old(filepath):
        """ Uses LLMSherpa API to parse PDF. Returns a llama-index Document.

        Can later do it locally with their public docker image.
        https://www.reddit.com/r/LocalLLaMA/comments/18lwa5c/alternative_tool_like_llmsherpa_that_can_run/
        """
        # This doc does not work with the node parser.
        llmsherpa_api_url = "https://readers.llmsherpa.com/api/document\
            /developer/parseDocument?renderFormat=all"
        pdf_reader = LayoutPDFReader(llmsherpa_api_url)
        doc = pdf_reader.read_pdf(filepath)
        return doc


def read_pdf(filepath):
    ''' Uses PyMuPDFReader to parse PDF and return Document Object.
    '''
    loader = PyMuPDFReader()
    doc = loader.load(filepath)


def get_pdf(input: str, output_path):
    """ Accepts user input and downloads relevant pdf.

        - Currently only accepts arXiv id,
        but can expand search query functionality.
        https://info.arxiv.org/help/api/user-manual.html#
        _details_of_atom_results_returned.
        - if user provides url to pdf, can directly call read_pdf with the url.

        - get multiple papers?

        - output to cloud..

        - generate (somewhere in code) f string with filename
          for easy storage (and later retrieval)
    """
    client = arxiv.Client()
    paper = next(arxiv.Client().results(arxiv.Search(id_list=[input])))
    paper.download_pdf(dirpath=output_path)
