import { useEffect, useState } from "react";
import { Card, Modal, Typography, Skeleton, message, Pagination, Button, Input, Row, Col } from "antd";
import './Styles.css';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

async function fetchNoticias(page, pageSize, filters = {}) {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local

    const params = new URLSearchParams({ page, pageSize, ...filters });

    // Configura la solicitud con los encabezados
    const response = await fetch(`https://localhost:7165/api/NoticiasApi?${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
            'Content-Type': 'application/json', // Asegúrate de especificar el tipo de contenido
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener las noticias");
    }
    
    return response.json();
}

function NoticiasPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [noticias, setNoticias] = useState([]);
    const [error, setError] = useState(null);
    const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(9);
    const [totalNoticias, setTotalNoticias] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const loadNoticias = async () => {
            try {
                const data = await fetchNoticias(currentPage, pageSize, {
                    titulo: searchQuery,
                    categoriaId: category
                });
                setNoticias(data.noticias);
                setTotalNoticias(data.totalCount);
            } catch (err) {
                setError(err.message);
                message.error("Error al cargar las noticias");
            } finally {
                setIsLoading(false);
            }
        };

        loadNoticias();
    }, [currentPage, pageSize, searchQuery, category]);
    const obtenerUrlImagenCompleta = (rutaRelativa) => {
        return `https://localhost:7165${rutaRelativa}`;
    };
    
    const abrirModalNoticia = (noticia) => {
        setNoticiaSeleccionada(noticia);
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
        setNoticiaSeleccionada(null);
    };

    const handleCategoryClick = (catId) => {
        setCategory(catId);
        setCurrentPage(1);
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    if (isLoading) {
        return <Skeleton active />;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <>
            <div className="search-categories-container">
                <div className="categories">
                    <Button type="link" onClick={() => handleCategoryClick(1)}>Política</Button>
                    <Button type="link" onClick={() => handleCategoryClick(2)}>Deportes</Button>
                    <Button type="link" onClick={() => handleCategoryClick(3)}>Tecnología</Button>
                    <Button type="link" onClick={() => handleCategoryClick(4)}>Entretenimiento</Button>
                    <Button type="link" onClick={() => handleCategoryClick(5)}>Anuncios</Button>
                    <Button type="link" onClick={() => handleCategoryClick("")}>Todas</Button>
                </div>
                <Input.Search
                    placeholder="Buscar noticias..."
                    enterButton
                    className="search-bar"
                    onSearch={handleSearch}
                />
            </div>

            <div className="noticias-grid">
                {noticias.length > 0 ? (
                    noticias.map((noticia) => (
                        <Card
                            key={noticia.id}
                            hoverable
                            cover={
                                <img
                                    src={obtenerUrlImagenCompleta(noticia.fotoUrl)}
                                    alt={noticia.titulo}
                                    className="noticia-imagen"
                                />
                            }
                            onClick={() => abrirModalNoticia(noticia)}
                            className="noticia-card"
                        >
                            <Meta
                                title={noticia.titulo}
                                description={`Publicado el ${new Date(
                                    noticia.fechaPublicacion
                                ).toLocaleDateString()}`}
                            />
                        </Card>
                    ))
                ) : (
                    <Text>No hay noticias disponibles.</Text>
                )}

                <Modal
                    visible={modalVisible}
                    title={noticiaSeleccionada?.titulo}
                    onCancel={cerrarModal}
                    footer={null}
                    centered
                >
                    {noticiaSeleccionada && (
                        <>
                           <img
    src={obtenerUrlImagenCompleta(noticiaSeleccionada.fotoUrl)}
    alt={noticiaSeleccionada.titulo}
    style={{ width: "50%", height: "auto", marginBottom: "8px", display: "block", margin: "0 auto" }}
/>

                            <Title level={4}>Por {noticiaSeleccionada.autor}</Title>
                            <Text type="secondary">
                                {noticiaSeleccionada.categoria} - {noticiaSeleccionada.pais}
                            </Text>
                            <Paragraph type="secondary">
                                <i>{noticiaSeleccionada.resumen}</i>
                            </Paragraph>
                            <Paragraph style={{ marginTop: "16px" }}>
                                {noticiaSeleccionada.contenido}
                            </Paragraph>
                        </>
                    )}
                </Modal>

                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalNoticias}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                    style={{ marginTop: "16px", textAlign: "center" }}
                />
            </div>
        </>
    );
}

export default NoticiasPage;
