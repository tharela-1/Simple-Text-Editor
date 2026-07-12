var textVal = document.getElementById("targetText")
var res = document.getElementById("stats")

// Add event listener for word count and character count
function updateValues(){
  let wordCount = textVal.value.trim().split(/\s+/).length
  if(textVal.value.trim().length===0){
    wordCount = 0
  }
  let charCount = textVal.value.length
  res.innerHTML = `<span class="labelText">Words count: ${wordCount} | Characters count (including spaces): ${charCount}</span>`
}
textVal.addEventListener("input",()=>{
  updateValues()
})

// Download as a Text File
function downloadFile(){
  const contentVal = textVal.value
  // Create a Blob class object | Blob --> Binary Large Object
  const blob = new Blob([contentVal], {type: 'text/plain'})
  // Create an anchor tag
  const tempLink = document.createElement('a')
  // Create a url from the blob
  const url = window.URL.createObjectURL(blob)
  // add href and download parameter to the anchor tag
  tempLink.href = url
  tempLink.download = "textContent.txt"
  // add anchor tag to DOM
  document.body.appendChild(tempLink)
  // click the link
  tempLink.click()
  // remove anchor tag from the DOM
  document.body.removeChild(tempLink)
  // delete the URL
  URL.revokeObjectURL(url)
  // alert the user
  alert("File has been downloaded successfully.")
}

// Copy to Clipboard
async function copyToClipBoard(){
  let val = textVal.value
  try{
    await navigator.clipboard.writeText(val)
    let button = document.getElementById('btn-2')
    button.textContent = "Copied!"

    setTimeout( () => {
      button.textContent = "Copy Text"
    }, 2500)
  }
  catch(err){
    alert("Failed to copy:"+err)
  }
}

// Clear Text
function clearText(){
  textVal.value = ""
  updateValues()
}