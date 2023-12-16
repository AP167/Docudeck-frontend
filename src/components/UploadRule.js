import React from 'react'
import UploadPdf from './UploadPdf'

const UploadRule = () => {
  const onUpload = async (file) => {
    console.log("File uploaded");
    // Send it to database
    console.log(file)

    const formData = new FormData();
    formData.append('policy', file);
    formData.append('pmId', '3'); 
    formData.append('policyName', 'abc');
  
    try {
      const response = await fetch('http://localhost:5000/add-policy', {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        console.log('PDF file successfully uploaded!');
      } else {
        console.error('Failed to upload PDF file.');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  }

  const uploadHeader = "Upload new Rules & Regulations";
  const uploadDescription = "(can be memo, circular, notice, etc...)";

  return (
    <UploadPdf onUpload={onUpload} uploadHeader={uploadHeader} uploadDescription={uploadDescription} />
  )
}

export default UploadRule
