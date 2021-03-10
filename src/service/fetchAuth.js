class Auth {
    constructor() {
        this.sugnupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7DlH5sNxwuj2MlUjS9ZTMjMJ4PSPf3oc';
        this.loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7DlH5sNxwuj2MlUjS9ZTMjMJ4PSPf3oc';
    }

    getLoginSingupData = async (params, type) => {
        const postParams = {
            method: 'POST',
            body: JSON.stringify(params),
        }

        switch (type) {
            case 'login':
                return await fetch(this.loginUrl, postParams).then(res=> res.json());
            case 'singup':
                return await fetch(this.sugnupUrl, postParams).then(res=> res.json());
            default: 
                return 'I cannot login user!';
        }
    }
}

const fetchAuthClass = new Auth();

export default fetchAuthClass;