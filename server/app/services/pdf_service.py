from io import BytesIO

from fastapi import HTTPException, UploadFile, status
from pypdf import PdfReader

from app.utils.text import compact_text


async def extract_pdf_text(file: UploadFile) -> str:
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF resume uploads are supported.",
        )

    content = await file.read()
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded file is empty.")

    reader = PdfReader(BytesIO(content))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    text = compact_text(text)
    if len(text) < 40:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Could not extract enough readable text from this PDF.",
        )
    return text

