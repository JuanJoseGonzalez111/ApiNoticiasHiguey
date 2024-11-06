import React, { useState } from 'react';

function PagePerpisoPublicar() {
  
  const [user, setUser] = useState({
    nombre: "", 
    id: "12345", 
    comentario: ""
  });

 
  const handleComentarioChange = (e) => {
    setUser({ ...user, comentario: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud enviada:", user);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Solicitud de Permiso para Publicar Noticias</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre de Usuario:</label>
          <input type="text" value={user.nombre} readOnly style={styles.input} />
        </div>
        
        <div style={{ display: 'none' }}>
          <label>ID de Usuario:</label>
          <input type="text" value={user.id} readOnly />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Comentario:</label>
          <textarea
            value={user.comentario}
            onChange={handleComentarioChange}
            placeholder="Escribe tu comentario aquí..."
            required
            style={styles.textarea}
          />
        </div>
        
        <button type="submit" style={styles.button}>Enviar Solicitud</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  }
};

export default PagePerpisoPublicar;
