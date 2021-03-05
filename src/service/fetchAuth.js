class Auth {
    constructor() {
        this.sugnupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7DlH5sNxwuj2MlUjS9ZTMjMJ4PSPf3oc';
        this.loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7DlH5sNxwuj2MlUjS9ZTMjMJ4PSPf3oc';
    }

    getLoginData = async params => {
        const postParams = {
            method: 'POST',
            body: JSON.stringify(params),
        }

        const result = await fetch(this.loginUrl, postParams).then(res=> res.json());
        
        return result;

    }

    getRegisterData = async params => {
        const postParams = {
            method: 'POST',
            body: JSON.stringify(params),
        }

        return await fetch(this.sugnupUrl, postParams).then(res=> res.json());
    }
}

const fetchAuthClass = new Auth();

export default fetchAuthClass;