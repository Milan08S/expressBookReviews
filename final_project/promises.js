const axios = require('axios')

async function getBooks() {
  try {
    const response = await axios.get('https://miguesanchez-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/');
    console.log('List of books:', response.data);
  } catch (error) {
    console.error('Error getting the books:', error.message);
  }
}

getBooks();

function getBookDetailsPromise(isbn) {
    return new Promise((resolve, reject) => {
      axios.get(`https://miguesanchez-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/${isbn}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
}
  
// Uso de la promesa:
getBookDetailsPromise(1)
.then(book => {
    console.log('Details of book:', book);
})
.catch(err => {
    console.error('Error getting book details', err.message);
});


function getBooksByAuthorPromise(author) {
    return new Promise((resolve, reject) => {
      axios.get(`https://miguesanchez-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/${encodeURIComponent(author)}`)
        .then(response => {
          resolve(response.data);  
        })
        .catch(error => {
          reject(error);      
        });
    });
}   
  
getBooksByAuthorPromise('Chinua Achebe')
.then(books => {
    console.log('Books of Chinua Achebe:', books);
})
.catch(err => {
    console.error('Error getting books of Chinua Achebe:', err.message);
});
  
  

function getBookByTitlePromise(title) {
return new Promise((resolve, reject) => {

    axios.get(`https://miguesanchez-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/${encodeURIComponent(title)}`)
    .then(response => {
        resolve(response.data); 
    })
    .catch(error => {
        reject(error);           
    });
});
}
  
getBookByTitlePromise('Things Fall Apart')
.then(book => {
    console.log('Details of Things Fall Apart:', book);
})
.catch(err => {
    console.error('Error getting the details of:', err.message);
});