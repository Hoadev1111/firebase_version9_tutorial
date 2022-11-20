import {initializeApp} from 'firebase/app';
import {
    getFirestore, collection, getDocs, onSnapshot, 
    addDoc, deleteDoc, doc, 
    query, where,
    orderBy, serverTimestamp, 
    getDoc, updateDoc
} from 'firebase/firestore'
import {
    getAuth, createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword, 
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD_6Cf4UrRrur9D6qhlZWWlgge5hFKX6AQ",
    authDomain: "chat-realtime-ht.firebaseapp.com",
    projectId: "chat-realtime-ht",
    storageBucket: "chat-realtime-ht.appspot.com",
    messagingSenderId: "1066487760736",
    appId: "1:1066487760736:web:70d1c6b3ed2fefd58d0005"
  }; 

//  init firebase app
  initializeApp(firebaseConfig);


// init services
const db = getFirestore();
const auth = getAuth();


// collection ref
const colRef = collection(db, 'books');

// query
// const q = query(colRef, where('author', '==', 'Wind Strong'));

// query && ordered
const q = query(colRef, orderBy('createAt'));



// ===============||===================
// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     const books = [];
//     snapshot.docs.forEach((doc) => {
//         books.push({...doc.data(), id: doc.id})
//     })
//     console.log(books);
//   })
//   .catch((err) => {
//       console.log(err.messaeg);
//   })
//===============||=========================

// get realtime collection data
const unsubCol = onSnapshot(q, (snapshot) => {
    const books = [];
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id});
    })
    console.log(books);
})  


//   adding documents
//  const db = getFirestore(); const colRef = collection(db, 'books');
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createAt: serverTimestamp(),
    })
    .then(() => {
        addBookForm.reset(); 
    })
})


// delete documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef)
    .then(() => {
        deleteBookForm.reset();
    })
})



// get single documents
// const docRef = doc(db, 'books', 'SL2Q1MsH4o8WJQ7DAQLy');
// getDoc(docRef)
//     .then((doc) => {
//         console.log(doc.data(), doc.id);
//     })

// get single document realtime
const docRef = doc(db, 'books', 'SL2Q1MsH4o8WJQ7DAQLy');
const unsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
})

// update paticular a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', updateForm.id.value);
    updateDoc(docRef, {
        author: "Xuan Hoa Web Dev"
    })
    .then(() => {
        updateForm.reset();
    })
})


// signing up user
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        // console.log('user created: ', cred.user);
        signupForm.reset();
    })
    .catch((err) => {
        console.log(err.message);
    })
})

// sign in user
const signinForm = document.querySelector('.login');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // signin
    const email = signinForm.email.value;
    const password = signinForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // console.log('The user have just loged in: ', cred.user);
            signinForm.reset();
        })
        .catch((err) => {
            console.log(err.message);
        })
})


// sign out user
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // console.log('The user have just loged out!');
        })
        .catch((err) => {
            console.log(err.message);
        })
})

// subcribing to auth change
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('The status of user: ', user);
})


// unsubcribing to db/auth changes
const unsubButton = document.querySelector('.unsub');
unsubButton.addEventListener('click', () => {
    console.log('Unsubscribing!');
    unsubCol();
    unsubDoc();
    unsubAuth();
})