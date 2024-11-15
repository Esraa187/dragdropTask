import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddTask({ show, onHide, addTask, type }) {
    const [task, setTask] = useState({
        id: Date.now(),
        title: "",
        description: "",
        priority: "",
        time: 0,
        tag: [],
        src: "",
        type: type,
        
    });

    const [errors, setErrors] = useState({});
    const [tagInput, setTagInput] = useState("")
    const saveChanges = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTask(prevTask => ({ ...prevTask, src: reader.result })); // Set src to base64 string
            };
            reader.readAsDataURL(file);
        }
    };
    const addTag = (e) => {
        e.preventDefault()
        if (tagInput.trim()) {
            const newTag = {
                name: tagInput,
                color: generateRandomColor()
            };
            setTask((prev) => ({
                ...prev,
                tag: [...prev.tag, newTag]
            }))
            setTagInput("")
        }

    }
    const validate = () => {
        const newErrors = {};

        if (!task.title.trim()) {
            newErrors.title = "Title of task is required";
        }
        if (!task.priority.trim()) {
            newErrors.priority = "Priority is required";
        }
        if (!task.description.trim()) {
            newErrors.description = "Description is required";
        }
        if (!task.time || task.time <= 0) {
            newErrors.time = "Estimated time must be greater than 0";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addTask(task);
            console.log(task)
            setTask({
                title: "",
                description: "",
                priority: "",
                time: 0,
                tag: [],
                src: "",
                type: type
            });
            onHide();
        }
    };

    // Function to generate a random color
    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="block w-full p-2 bg-slate-200 rounded-md my-3"
                        onChange={saveChanges}
                        value={task.title}
                    />
                    {errors.title && <div className="text-red-500">{errors.title}</div>}

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        className="block w-full p-2 bg-slate-200 rounded-md my-3"
                        onChange={saveChanges}
                        value={task.description}
                    />
                    {errors.description && <div className="text-red-500">{errors.description}</div>}

                    <select name="priority" value={task.priority} className='block w-full p-2 bg-slate-200 rounded-md my-3 focus:border-none' onChange={saveChanges}>
                        <option value="">Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    {errors.priority && <div className="text-red-500">{errors.priority}</div>}

                    <input
                        type="number"
                        name="time"
                        placeholder="Estimated time"
                        className="block w-full p-2 bg-slate-200 rounded-md my-3"
                        onChange={saveChanges}
                        value={task.time}
                    />
                    {errors.time && <div className="text-red-500">{errors.time}</div>}
                    <input
                        type="text"
                        name="tag"
                        placeholder="Tag Title"
                        className="block w-full p-2 bg-slate-200 rounded-md my-3"
                        onChange={(e) => setTagInput(e.target.value)}
                        value={tagInput}
                    />
                    <button className='w-full bg-slate-500 text-white rounded py-1' onClick={addTag}>Add Tag</button>
                    <p className='pt-4'>Tags : {task.tag.map((tag, index) => (
                        <span key={index} style={{ backgroundColor: tag.color+"3d",color:tag.color }} className="inline-block px-2 py-1 mr-2 rounded ">
                            {tag.name}
                        </span>
                    ))}</p>
                    <input
                        type="file"
                        className="my-3"
                        onChange={handleFileChange}
                    />

                    <Button type="submit" className="mt-3">Submit</Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddTask;
