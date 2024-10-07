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
       // aurrera.addEventListener('click', this.nextBook);
        aurrera.onclick = () => this.nextBook();
        //atzera.addEventListener('click', this.prevBook);
        atzera.onclick = () => this.prevBook();
        bilatu.onclick = () =>{ 
            fetch(`https://openlibrary.org/search.json?isbn=${this.isbn.value}`).
            then(resp => resp.json()).
            then(data => this.handleSearchData(data));
        }
    }

    extractBookData = (book) => {
         // json objektu egoki bat bueltatu, zure webgunean erabili ahal izateko
         let resp = {
            isbn: book.docs[0].isbn,
            egilea: book.docs[0].author_name[0],
            data: book.docs[0].publish_date,
            izenburua: book.docs[0].title,
            filename: book.filename
        };
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
        let book = this.extractBookData(data);
        this.index = this.addBookToData(book, this.data);
        this.updateView();
    };

    updateView() {
         // liburuaren datu guztiak bistaratu
        // liburu kopurua bistaratu
        let liburua = this.data[this.index];
        this.izenburua.value  = liburua.izenburua;
        this.egilea.value = liburua.egilea;
        this.isbn.value = liburua.isbn;
        this.dataElem.value = liburua.data;
        this.irudia.src = 'https://covers.openlibrary.org/b/id/' +this.data[this.index].filename;
        this.liburuKopuru.value = this.data.length;
    }

    nextBook() {
        // Hurrengo indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu liburu kopurua gainditu
        if(this.index + 1 < this.data.length){
            this.index ++;
            this.updateView();
     }
    }

    prevBook() {
       // Aurreko indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu 0 indizea gainditu
        if(this.index> 0){
            this.index --;
            this.updateView();
    }
    }
}
