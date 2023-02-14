import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig: FirebaseOptions = {
	apiKey: 'AIzaSyDsgqxFTAzpWi5jO6SqtAvFnuNpNZGk6Vo',
	authDomain: 'psych-support-system-37213.firebaseapp.com',
	projectId: 'psych-support-system-37213',
	storageBucket: 'psych-support-system-37213.appspot.com',
	messagingSenderId: '955612507216',
	appId: '1:955612507216:web:8fb0047bc8d59202c8b555',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
