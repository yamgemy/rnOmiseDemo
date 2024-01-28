const BASEURL = 'http://www.someurl.com/';

function getheaders() {
    return {
        'Content-Type': 'application/json',
    };
};

export class CardsApi {

    public static addCardWithToken = (cardInfo:any) => {
        console.log(cardInfo);
        const url = BASEURL + 'cards';
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(cardInfo),
            headers: getheaders(),
        });
    };

    public static getAllCards = () => {
        const url = BASEURL + 'cards';
        return fetch(url, {
            method: 'GET',
            headers: getheaders(),
        });
    };
}