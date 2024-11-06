import { useState } from "react";
import { Form, Input, Button, Upload, DatePicker, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function CrearNoticiaPage() {
    const [titulo, setTitulo] = useState("");
    const [resumen, setResumen] = useState("");
    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");
    const [categoria, setCategoria] = useState("");
    const [pais, setPais] = useState("");
    const [fechaPublicacion, setFechaPublicacion] = useState(null);
    const [foto, setFoto] = useState<File | null>(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append("titulo", values.titulo);
        formData.append("resumen", values.resumen);
        formData.append("autor", values.autor);
        formData.append("contenido", values.contenido);
        formData.append("categoria", values.categoria);
        formData.append("pais", values.pais);
        formData.append("fechaPublicacion", values.fechaPublicacion?.format("YYYY-MM-DD"));

        if (foto) {
            formData.append("foto", foto); // Agrega la imagen si está presente
        }

        try {
            const response = await fetch("https://localhost:7165/api/NoticiasApi", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al crear la noticia");
            }

            message.success("Noticia creada con éxito");
        } catch (err: any) {
            setError(err.message);
            message.error(err.message);
        }
    };

    const handleUploadChange = (info: any) => {
        if (info.file.status === "done") {
            setFoto(info.file.originFileObj);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Crear Nueva Noticia</h2>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Título" name="titulo" rules={[{ required: true, message: "Por favor ingresa el título!" }]}>
                    <Input onChange={(e) => setTitulo(e.target.value)} />
                </Form.Item>
                <Form.Item label="Resumen" name="resumen" rules={[{ required: true, message: "Por favor ingresa el resumen!" }]}>
                    <Input onChange={(e) => setResumen(e.target.value)} />
                </Form.Item>
                <Form.Item label="Autor" name="autor" rules={[{ required: true, message: "Por favor ingresa el autor!" }]}>
                    <Input onChange={(e) => setAutor(e.target.value)} />
                </Form.Item>
                <Form.Item label="Contenido" name="contenido" rules={[{ required: true, message: "Por favor ingresa el contenido!" }]}>
                    <Input.TextArea onChange={(e) => setContenido(e.target.value)} />
                </Form.Item>
                <Form.Item label="Categoría" name="categoria" rules={[{ required: true, message: "Por favor ingresa la categoría!" }]}>
                    <Input onChange={(e) => setCategoria(e.target.value)} />
                </Form.Item>
                <Form.Item label="País" name="pais" rules={[{ required: true, message: "Por favor ingresa el país!" }]}>
                    <Input onChange={(e) => setPais(e.target.value)} />
                </Form.Item>
                <Form.Item label="Fecha de Publicación" name="fechaPublicacion" rules={[{ required: true, message: "Por favor selecciona la fecha!" }]}>
                    <DatePicker onChange={(date) => setFechaPublicacion(date)} />
                </Form.Item>
                <Form.Item label="Foto" name="foto">
                    <Upload onChange={handleUploadChange} accept="image/*">
                        <Button icon={<UploadOutlined />}>Subir Foto</Button>
                    </Upload>
                </Form.Item>
                {error && <div className="error-message">{error}</div>}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Crear Noticia
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CrearNoticiaPage;
