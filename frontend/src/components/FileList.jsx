import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import api from "../api";
import "./FileList.scss";
const FileList = forwardRef((props, ref) => {
    const [items, setItems] = useState([]);


    const load = async () => {
        // Date.now()를 쿼리스트링으로 붙여 캐시를 회피
        const { data } = await api.get("/files", {
            params: { t: Date.now() }
        });
        console.log("GET /files 응답:", data.out);
        setItems(data.out);
    };


    useEffect(() => {
        load();
    }, []);
    // 부모에서 ref.current.load() 호출할 수 있게 노출
    useImperativeHandle(ref, () => ({ load }));

    const del = async (id) => {

        if(!window.confirm("정말로 삭제 하시겠습니까?")) return

        try {
            await api.delete(`./files/${id}`)
            await load()

            console.log('파일 삭제 완료', id)
        
        } catch (error) {
            
            console.log('파일 삭제 에러', error)
            
        }
    }

    return (
        <ul className="file-list">
            {items.map((it) => (
                <li
                    key={it._id}
                >
                    <h3>{it.title || it.originalName}</h3>
                    {it.contentType?.startsWith("image/") && (
                        <div className="img-wrap">

                            <img src={it.url} alt="" style={{ maxWidth: 200, display: "block" }} />
                        </div>
                    )}
                    <p>{it.description}</p>
                    <div className="btn-wrap">

                        <a href={it.url} target="_blank" rel="noreferrer" className="open-btn">Open</a>
                        <button
                            className="delete-btn"
                            onClick={() => del(it._id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>

    )
})

export default FileList