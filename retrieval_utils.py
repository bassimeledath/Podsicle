import re
import arxiv
from llmsherpa.readers import LayoutPDFReader


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


def read_pdf(filepath):
    """ Uses LLMSherpa API to parse PDF.

    Can later do it locally with their public docker image.
    https://www.reddit.com/r/LocalLLaMA/comments/18lwa5c/
    alternative_tool_like_llmsherpa_that_can_run/
    """
    llmsherpa_api_url = "https://readers.llmsherpa.com/api/document/\
                         developer/parseDocument?renderFormat=all"
    pdf_reader = LayoutPDFReader(llmsherpa_api_url)
    doc = pdf_reader.read_pdf(filepath)
    return doc


def get_arxiv_references(doc) -> set:
    """ Returns set of all arXiv ids for references in the paper.

    Necessarily limited to references that exist in arXiv.
    """
    patterns = [r"\w+-\w+/\d{7}", r"\d{4}\.\d{4,5}"]

    refs = set()
    for pattern in patterns:
        [refs.add(item) for item in re.findall(pattern, doc.to_text())]
    return refs
