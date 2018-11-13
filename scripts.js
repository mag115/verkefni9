// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */

const program = (() => {
  let domains;
  function displayError(error) {
    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));
  }

  function displayDomain(list) {
    if (list.length === 0) {
      displayError('Fann ekki lén');
      return;
    }
    const [{
      domain, registered, lastChange, expires, registrantname, email,
      address, country,
    }] = list;


    const domainTextList = document.createElement('dl');
    const domainText = document.createElement('dt');
    domainText.appendChild(document.createTextNode('Lén'));
    domainTextList.appendChild(domainText);
    const domainNameElement = document.createElement('dd');
    domainNameElement.appendChild(document.createTextNode(domain));
    domainTextList.appendChild(domainNameElement);

    const registeredTextList = document.createElement('dl');
    const registeredText = document.createElement('dt');
    registeredText.appendChild(document.createTextNode('Skráð'));
    registeredTextList.appendChild(registeredText);
    const registeredNameElement = document.createElement('dd');
    registeredNameElement.appendChild(document.createTextNode(registered));
    registeredTextList.appendChild(registeredNameElement);

    const lastChangeTextList = document.createElement('dl');
    const lastChangeText = document.createElement('dt');
    lastChangeText.appendChild(document.createTextNode('Seinast breytt'));
    lastChangeTextList.appendChild(lastChangeText);
    const lastChangeNameElement = document.createElement('dd');
    lastChangeNameElement.appendChild(document.createTextNode(lastChange));
    lastChangeTextList.appendChild(lastChangeNameElement);

    const expiresTextList = document.createElement('dl');
    const expiresText = document.createElement('dt');
    expiresText.appendChild(document.createTextNode('Rennur út'));
    expiresTextList.appendChild(expiresText);
    const expiresNameElement = document.createElement('dd');
    expiresNameElement.appendChild(document.createTextNode(expires));
    expiresTextList.appendChild(expiresNameElement);

    const registrantTextList = document.createElement('dl');
    const registrantText = document.createElement('dt');

    registrantTextList.appendChild(registrantText);
    const registrantNameElement = document.createElement('dd');
    registrantNameElement.appendChild(document.createTextNode(registrantname));
    registrantTextList.appendChild(registrantNameElement);

    const emailTextList = document.createElement('dl');
    const emailText = document.createElement('dt');

    emailTextList.appendChild(emailText);
    const emailNameElement = document.createElement('dd');
    emailNameElement.appendChild(document.createTextNode(email));
    emailTextList.appendChild(emailNameElement);

    const addressTextList = document.createElement('dl');
    const addressText = document.createElement('dt');

    addressTextList.appendChild(addressText);
    const addressNameElement = document.createElement('dd');
    addressNameElement.appendChild(document.createTextNode(address));
    addressTextList.appendChild(addressNameElement);

    const countryTextList = document.createElement('dl');
    const countryText = document.createElement('dt');

    countryTextList.appendChild(countryText);
    const countryNameElement = document.createElement('dd');
    countryNameElement.appendChild(document.createTextNode(country));
    countryTextList.appendChild(countryNameElement);

    if (!!registrantname && !!email && !!address
    && !!country) {
      registrantText.appendChild(document.createTextNode('Skráningaraðili'));

      emailText.appendChild(document.createTextNode('Netfang'));

      addressText.appendChild(document.createTextNode('Heimilisfang'));

      countryText.appendChild(document.createTextNode('Land'));
    }

    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(domainTextList);
    container.appendChild(registeredTextList);
    container.appendChild(lastChangeTextList);
    container.appendChild(expiresTextList);
    if (registrantname !== '' && email !== '' && address !== ''
    && country !== '') {
      container.appendChild(registrantTextList);
      container.appendChild(emailTextList);
      container.appendChild(addressTextList);
      container.appendChild(countryTextList);
    }
  }


  function fetchData(domain) {
    fetch(`${API_URL}${domain}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Villa við að sækja gögn');
      })
      .then((data) => {
        displayDomain(data.results);
      })
      .catch((error) => {
        displayError('Lén verður að vera strengur');
        console.error(error);
      });
  }


  function onSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');

    setTimeout(() => {
      const gif = document.createElement('gif');
      gif.src = 'loading.gif';
    });
    fetchData(input.value);
  }

  function init(_domains) {
    domains = _domains;

    const form = domains.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }


  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const domains = document.querySelector('.domains');

  program.init(domains);
});
