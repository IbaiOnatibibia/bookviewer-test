export class BookViewer {

    constructor(data, base) {
        this.base = base;
        this.search_base = 'https://openlibrary.org/search.json?isbn=';
        this.data = data;
        this.index = 0;

        this.irudia = document.getElementById("irudia");
        this.egilea = document.getElementById("egilea");
        this.izenburua = document.getElementById("izenburua");
        this.dataElem = document.getElementById("data");
        this.isbn = document.getElementById("isbn");
        this.liburuKopuru = document.getElementById("liburuKopuru");

        this.initButtons();
        this.updateView();
    }
  
    initButtons() {
        // aurrera, atzera eta bilatu botoiak hasieratu
        // bilatu botoia sakatzean, erabiltzaileak sartu duen isbn-a duen liburua lortu
        // eta handleSearchData funtzioa exekutatu
        let aurrera = document.getElementById('aurrera');
        let atzera = document.getElementById('atzera');
        let bilatu = document.getElementById('bilatu');
        let  resp =  bilatu.addEventListener('click',this.bilatuliburua(isbn.value));
        this.handleSearchData(resp);
    }

    extractBookData = (book) => {
        // json objektu egoki bat bueltatu, zure webgunean erabili ahal izateko
        fetch(`https://openlibrary.org/search.json?isbn=${book}`).
        then(resp => resp.json());
        return resp;
      }
      
    addBookToData = (book, data) => {
        // data array-ean sartu liburua, eta liburu berriaren posizioa bueltatu
        data.push(book);
        return data.length - 1;
    };

    handleSearchData = (data) => {
        // lortu liburua data objektutik
        // extractBookData eta addBookToData funtzioak erabili, indizea berria lortuz
        // updateView funtzioa erabili, liburu berria bistaratzeko
    };

    updateView() {
        // liburuaren datu guztiak bistaratu
        // liburu kopurua bistaratu
    }

    nextBook() {
        // Hurrengo indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu liburu kopurua gainditu
    }

    prevBook() {
        // Aurreko indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu 0 indizea gainditu
    }
}
