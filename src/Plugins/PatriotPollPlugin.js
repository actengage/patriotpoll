import Axios from 'axios';

export const BASE_URL = 'https://api.patriotpoll.net/v1';
import { source } from '../Helpers/URLSearchParams';

export default function(Vue, options = {}) {
    // If Axios is not installed, throw an error
    if(!Axios) {
        throw new Error('Axios is a required external dependency. Make sure its available in the global scope.');
    }

    // Get the api key from the options or config file.
    const apiKey = options.apiKey || process.env.VUE_APP_PATRIOT_POLL_API_KEY;

    // Gethe base url from the options or config file.
    const baseURL = options.baseUrl
        || options.baseURL
        || process.env.VUE_APP_PATRIOT_POLL_BASE_URL
        || BASE_URL;

    // Create an Axios instance.
    const axios = Axios.create({
        baseURL,
        headers: {
            Authorization: apiKey && `Bearer ${apiKey}`,
            Source: source(),
            Href: window.location.href,
        }
    });
        
    Vue.prototype.$patriotpoll = Object.assign(axios, {
        
        getSessionId() {
            return window.localStorage.getItem('__poll_session__');
        },
        
        setSessionId(value) {
            window.localStorage.setItem('__poll_session__', value);
        },

        session(id) {
            try {
                return id ? this.setSessionId(id) : this.getSessionId();
            }
            catch (e) {
                return null;
            }
        },

        contact() {
            try {
                return JSON.parse(window.localStorage.__poll__);
            }
            catch (e) {
                return null;
            }
        },

        forget() {
            try {
                window.localStorage.removeItem('__poll__');

                return true;
            }
            catch (e) {
                return false;
            }
        },
        
        headers(contact) {
            for(let [key, value] of Object.entries(contact || {})) {
                Object.assign(axios.defaults.headers, {
                    [`Contact-${key.charAt(0).toUpperCase() + key.slice(1)}`]: value
                });
            }

            return this;
        },

        remember(contact) {
            try {
                const saveData = Object.fromEntries(
                    Object.entries(contact).filter(([ key, value ]) => !!value)
                );

                window.localStorage.setItem('__poll__', JSON.stringify(saveData));

                this.headers(saveData);
                
                return true;
            }
            catch (e) {
                return false;
            }
        },

    });
    
    axios.headers(axios.contact());
}