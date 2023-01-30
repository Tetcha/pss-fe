import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
	apiKey: 'AIzaSyCmalbHJEAtSQXS8fRPpGL4nKrfzAI8umc',
	authDomain: 'psych-support-system.firebaseapp.com',
	projectId: 'psych-support-system',
	storageBucket: 'psych-support-system.appspot.com',
	messagingSenderId: '585027434337',
	appId: '1:585027434337:web:a367cb531c18141b237720',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
