"use client";
import { useState, useEffect } from 'react';
import styles from './Home.module.css'; // Importa el archivo CSS

export default function Home() {
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');
  const [namesList, setNamesList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const localName = localStorage.getItem('name');
    if (localName) setStoredName(localName);
  }, []);

  const handleSaveName = () => {
    if (!name.trim()) return;

    localStorage.setItem('name', name);
    setStoredName(name);

    fetch('/api/saveName', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    }).catch((err) => console.error('Error saving name:', err));
  };

  const shuffleArray = (array) => {
    // Copiamos el array original para evitar mutarlo
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Intercambia elementos
    }

    return shuffled;
  };

  const handleFetchNames = () => {
    if (namesList.length === 0) {
      fetch('/api/readNames')
        .then((res) => res.json())
        .then((data) => {
          setNamesList(data.names);
          if (data.names.length === 11) {
            for (let index = 0; index < data.names.length; index++) {
              if (data.names[index] === storedName) {
                setCurrentIndex((index + 1) % data.names.length);
                break;
              }
            }
          }
        })
        .catch((err) => console.error('Error loading names:', err));
    } else {
      if (namesList.length === 11) {
        for (let index = 0; index < namesList.length; index++) {
          if (namesList[index] === storedName) {
            setCurrentIndex((index + 1) % namesList.length);
            break;
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Amigo imaginario</h1>
      <div>
        <input
          type="text"
          placeholder="Introduce tu nombre para enseñarselo a tu amigo imaginario"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={Boolean(storedName)}
          className={styles.input}
        />
        <button
          onClick={handleSaveName}
          disabled={Boolean(storedName)}
          className={styles.button}
        >
          Guardar Nombre
        </button>
      </div>
      {storedName && (
        <p className={styles.text}>
          Nombre guardado: <span className={styles.highlight}>{storedName}</span>
        </p>
      )}
      <p className={styles.text}>
        (cuando los 11 amigos pongan sus nombres)
      </p>
      <button onClick={handleFetchNames} className={styles.button}>
        Ver a quien regalar
      </button>
      <>
        <p className={styles.text}>
          Amigos que se han introducido:
        </p>
        <p className={styles.text}>{listaDesordenada.join(", ")}</p>
      </>
      {currentIndex !== -1 && namesList.length !== 0 && (
        <>
          <p className={styles.text}>
            Te toca regalar a regalar: <span className={styles.highlight}>{namesList[currentIndex]}</span>
          </p>
        </>
      )}
    </div>
  );
}
