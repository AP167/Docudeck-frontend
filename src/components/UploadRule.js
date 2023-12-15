import React from 'react'
import UploadPdf from './UploadPdf'

const UploadRule = () => {
  const onUpload = () => {
    console.log("File uploaded");
    // Send it to database
  }

  const uploadHeader = "Upload new Rules & Regulations";
  const uploadDescription = "(can be memo, circular, notice, etc...)";

  return (
    <UploadPdf onUpload={onUpload} uploadHeader={uploadHeader} uploadDescription={uploadDescription} />
  )
}

export default UploadRule
