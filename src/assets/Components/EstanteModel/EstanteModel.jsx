import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './EstanteModel.module.css';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from '@mui/material';
import placeholder from '../../../../public/images/placeholder.jpg';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const btn = {
marginBottom : '5px',
color: '#8a9ac0',
border: '1px solid #8a9ac0',
  '&:hover': {
    color: '#081b32f1',
    backgroundColor: '#081b32f1', // Cor de fundo quando o cursor está sobre o botão
  },
}

export default function EstanteModel() {
  const [estantes, setEstantes] = useState([]);
  const [livros, setLivros] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [newCoverLink, setNewCoverLink] = useState('');

  const handleUpdate = () => {
    // Abre o modal de atualização
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    // Fecha o modal de atualização
    setUpdateModalOpen(false);
  };

  const handleCoverLinkChange = (e) => {
    // Atualiza o estado com o link da nova capa
    setNewCoverLink(e.target.value);
  };

  const handleUpdateCover = async () => {
    try {
      // Faça uma solicitação ao backend para atualizar o link da capa
      await axios.put(`http://localhost:3000/atualizarLinkCapa/${selectedBook.LivroID}`, {
        novoLinkCapa: newCoverLink,
      });

      // Atualize o estado para refletir o novo link da capa
      setLivros((livros) => {
        const estanteId = selectedBook.EstanteID;
        const updatedLivros = livros[estanteId].map((livro) =>
          livro.LivroID === selectedBook.LivroID
            ? { ...livro, img: newCoverLink }
            : livro
        );
        return { ...livros, [estanteId]: updatedLivros };
      });

      // Feche o modal de atualização
      handleCloseUpdateModal();
    } catch (error) {
      console.error('Erro ao atualizar link da capa:', error);
      // Adicione uma lógica para lidar com erros, se necessário
    }
  };

  //////////////////////////////////////////

  // Restante do seu código...

  const handleBookClick = (livro) => {
    // Abre o modal com as informações do livro clicado
    setSelectedBook(livro);
  };

  const handleCloseModal = () => {
    // Fecha o modal
    setSelectedBook(null);
  };

  useEffect(() => {
    // Função para buscar estantes no back-end
    const fetchEstantes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/estantes'); 
        setEstantes(response.data);
      } catch (error) {
        console.error('Erro ao buscar estantes:', error);
      }
    };

    // Chama a função para buscar estantes quando o componente for montado
    fetchEstantes();


    const intervalId = setInterval(fetchEstantes, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval (intervalId);
  }, []); // O segundo parâmetro vazio faz com que a função seja executada apenas uma vez, quando o componente é montado

  const fetchLivros = async (estanteID) => {
    try {
      const response = await axios.get(`http://localhost:3000/livrosEstante/${estanteID}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar livros da estante ${estanteId}:`, error);
      return [];
    }
  };

  

  useEffect(() => {
    // Buscar livros para cada estante
    const fetchLivrosForEstantes = async () => {
      const livrosData = {};
      for (const estante of estantes) {
        const livrosDaEstante = await fetchLivros(estante.EstanteID);
        livrosData[estante.EstanteID] = livrosDaEstante;
      }
      setLivros(livrosData);
    };

    // Executar a busca de livros quando as estantes forem carregadas
    if (estantes.length > 0) {
      fetchLivrosForEstantes();
    }
  }, [estantes]);

  const handleDelete = async () => {
    try {
      // Faça uma solicitação ao backend para excluir o livro
      await axios.delete(`http://localhost:3000/deletarLivro/${selectedBook.LivroID}`);
  
      // Atualize o estado para refletir a exclusão do livro
      setLivros((livros) => {
        const estanteId = selectedBook.EstanteID;
        const updatedLivros = livros[estanteId].filter((livro) => livro.LivroID !== selectedBook.LivroID);
        return { ...livros, [estanteId]: updatedLivros };
      });
  
      // Feche o modal
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      // Adicione uma lógica para lidar com erros, se necessário
    }
  };

  return (
    <div>
      {estantes.map((estante) => (
        <div key={estante.EstanteID} className={styles.estante}>
          <h3>{estante.NomeEstante}</h3>
          <div className={styles.scrollLivros}>
            {/* Aqui você precisaria adicionar a lógica para carregar e exibir os livros da estante */}
            {livros[estante.EstanteID]?.map((livro) => (
              <div key={livro.LivroID} className={styles.livro} onClick={() => handleBookClick(livro)}>
                <img
                  src={livro.img ? livro.img : placeholder}
                  alt={livro.Titulo || 'Título não disponível'}
                />
                <h4>{livro.Titulo}</h4>
              </div>
            ))}

          </div>
        </div>
      ))}
      {/* Modal */}
      <Modal open={selectedBook !== null} onClose={handleCloseModal} closeAfterTransition style={modalStyle}>
        <Fade in={selectedBook !== null}>
          <div className={styles.cardStyle}>
            {selectedBook && (
              <Card>
                <CardMedia
                  component="img"
                  alt={selectedBook.Titulo || 'Título não disponível'}
                  width="350"
                  height="150"
                  image={selectedBook.img || placeholder}
                />
                <CardContent>
                  <Typography variant="h5">
                    {selectedBook.Titulo || 'Título não disponível'}
                  </Typography>
                  <Typography variant="subtitle1">
                    Autor: {selectedBook.Autor || 'Autor não disponível'}
                  </Typography>
                  <Typography variant="body1">
                    {selectedBook.Descricao || 'Descrição não disponível'}
                  </Typography>
                  <Button onClick={handleDelete} color="secondary" style={{ ...btn, width: '100%', height: '50px', fontSize:'1.2rem' }}>
                    Deletar Livro
                  </Button>
                  <Button onClick={handleUpdate} color="secondary" style={{ ...btn, width: '100%', height: '50px', fontSize:'1.2rem' }}>
                    Alterar Capa
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </Fade>
      </Modal>

      {/* Modal de Atualização de Capa */}
      <Modal open={isUpdateModalOpen} onClose={handleCloseUpdateModal} closeAfterTransition style={modalStyle}>
        <Fade in={isUpdateModalOpen}>
          <div className={styles.cardStyle}>
            <Card>
              <CardContent>
                <Typography variant="h5">Alterar Capa</Typography>
                <TextField
                  label="Novo Link da Capa"
                  variant="outlined"
                  fullWidth
                  value={newCoverLink}
                  onChange={handleCoverLinkChange}
                />
                <Button onClick={handleUpdateCover} color="primary" style={{ ...btn, width: '100%', height: '50px', fontSize:'1.2rem' }}>
                  Atualizar Capa
                </Button>
              </CardContent>
            </Card>
          </div>
        </Fade>
      </Modal>


    </div>

    
  );
}
