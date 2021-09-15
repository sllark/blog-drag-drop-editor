import React from 'react';
import Modal from "../UI/Modal";


const EditorModal = (props) => {


    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(e.target.reportValidity());

        if (e.target.reportValidity()) {
            props.hideModal()
            props.savePost();
        }
    }


    return (

        <Modal
            show={props.showPostModal}
            backdropClick={props.hideModal}
        >
            <form onSubmit={handleSubmit}>

                <div className="formGroup">
                    <label htmlFor="postTitle">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={props.title}
                        required
                        minLength={5}
                        onChange={props.updatedPostDetails}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="featuredImage">Featured Image URL</label>
                    <input
                        type="url"
                        id="featuredImage"
                        value={props.featuredImage}
                        onChange={props.updatedPostDetails}
                    />
                </div>


                <div className="formGroup">
                    <label htmlFor="postDescription">Description</label>
                    <textarea
                        id="postDescription"
                        value={props.postDescription}
                        onChange={props.updatedPostDetails}
                        rows={5}
                    />
                </div>

                <div className="formGroup">
                    <button type='submit' className="btn btn--secondary">Save Details</button>
                </div>


            </form>

        </Modal>

    )
}


export default EditorModal;