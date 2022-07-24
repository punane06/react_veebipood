import { useRef, useState } from "react";

// SALVESTADA SAAB:
//  1. Brauseri storage-sse
//  2. Andmebaas
//  3.Fail/Excel

function TooteLisamine() {
  const nimiRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();
  //   vasak pool - HTML ja ta saab väärtuse esialgu useState(-->SIIT<--)
  // parem pool - JavaScriptis, funktsioon mis annab UUE VÄÄRTUSE
  // maarasonum(-->SIIT<--)
  const [sonum, maarasonum] = useState("");
  const dbUrl =
    "https://react-june-default-rtdb.europe-west1.firebasedatabase.app/tooted.json";

  const lisaToode = () => {
    console.log("Funktsioon tootab");
    console.log("Vajutuse hetkel ref vaartus " + nimiRef.current.value);
    if (nimiRef.current.value === "") {
      maarasonum("Ei olnud toode valitud");
    } else {
      maarasonum("Lisatud edukalt toode " + nimiRef.current.value);
      // let tootedLocalStorage = localStorage.getItem("toodeteVoti");
      // tootedLocalStorage = JSON.parse(tootedLocalStorage) || [];
      const uusToode = {
        nimi: nimiRef.current.value,
        hind: priceRef.current.value,
        aktiivne: isActiveRef.current.checked,
      };
      fetch(dbUrl, {
        method: "POST",
        body: JSON.stringify(uusToode),
        header: {
          "Content-Type": "application/json",
        },
      });
      // tootedLocalStorage.push(uusToode);
      // tootedLocalStorage = JSON.stringify(tootedLocalStorage);
      // määrates on vaja võtit ja vääertust
      // localStorage.setItem("toodeteVoti", tootedLocalStorage);
    }
  };

  return (
    <div>
      <br />
      <label>Toote nimetus</label>
      <br />
      <input ref={nimiRef} type="text" />
      <br />
      <label>Toote hind</label>
      <br />
      <input ref={priceRef} type="number" />
      <br />
      <label>Toote aktiivne</label>
      <br />
      <input ref={isActiveRef} type="checkbox" />
      <br />
      <button onClick={lisaToode}>Sisesta</button>
      <div>{sonum}</div>
    </div>
  );
}

export default TooteLisamine;

// Kui lisan ühe on lihtne
// localStorage.setItem("toodeteVoti", nimiRef.current.value);

// Kui tahan lisada varasematele juurde
// 1. võtan mis on varem localStorage           loalStorage.getItem("VOTI")
// 2.1 kuna kõik on localStorage+s Stringi kujul, aga mul on array/list/massiiv kujul
// 2.2 pean võtma jutumärgid ära                JSON.paese()
// 3. lisan ühe juurde                          .push()
// 4. pean jutumärgid arrayle tagasi            JSON.stringify()
// !! localStorage-sse pandud asjad peavad kõik olema stringi kujul
// 5. panen localStoragesse                     localStorage.setItem("VOTI", lisatav_vaartus)
