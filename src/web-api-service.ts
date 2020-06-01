export class WebAPIService {

  contacts: any[];
  latency = 200;
  id = 0;

  constructor() {
    this.contacts = [
      {
        id: this.getId(),
        firstName: 'John',
        lastName: 'Tolkien',
        email: 'tolkien@inklings.com',
        phoneNumber: '867-5309'
      },
      {
        id: this.getId(),
        firstName: 'Clive',
        lastName: 'Lewis',
        email: 'lewis@inklings.com',
        phoneNumber: '867-5309'
      },
      {
        id: this.getId(),
        firstName: 'Owen',
        lastName: 'Barfield',
        email: 'barfield@inklings.com',
        phoneNumber: '867-5309'
      },
      {
        id: this.getId(),
        firstName: 'Charles',
        lastName: 'Williams',
        email: 'williams@inklings.com',
        phoneNumber: '867-5309'
      },
      {
        id: this.getId(),
        firstName: 'Roger',
        lastName: 'Green',
        email: 'green@inklings.com',
        phoneNumber: '867-5309'
      }
    ];
  }

  isRequesting = false;

  getContactList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = this.contacts.map(x => {
          return {
            id: x.id,
            firstName: x.firstName,
            lastName: x.lastName,
            email: x.email
          }
        });
        resolve(results);
        this.isRequesting = false;
      }, this.latency);
    });
  }

  getContactDetails(id) {

    console.log(this.contacts);

    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = this.contacts.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, this.latency);
    });
  }

  saveContact(contact) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contact.filter(x => x.id == contact.id)[0];

        if (found) {
          let index = contact.indexOf(found);
          contact[index] = instance;
        } else {
          instance.id = this.getId();
          this.contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, this.latency);
    });
  }


  getId() {
    return ++this.id;
  }

}
