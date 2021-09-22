import React from "react";


import EditorHeader from '../components/Editor/EditorHeader';
import EditorWindow from '../components/Editor/EditorWindow';
import EditorComponents from '../components/Editor/EditorComponentsSidebar';
import EditorStylesSidebar from '../components/Editor/EditorStylesSidebar';
import EditorModal from '../components/Editor/EditorModal';

import axios from "../helper/axios";
import handleAxiosError from "../helper/handleAxiosError";
import ShowResponse from "../components/UI/ShowResponse";


function getCompIndex(id, components) {
    return components.findIndex(comp => comp.randID === id);
}

function getSelectedCompIndex(components) {
    return components.findIndex(comp => comp.selected || comp.focused);
}


class Editor extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            showComponents: true,
            components: [],
            title: 'New Post',
            featuredImage: 'https://fakeimg.pl/420x320/ff0000,128/333333,255/?font=lobster',
            postDescription: '',
            postId: null,
            showPostModal: false,
            showSavingLoader: false,
            saveStatus: null,
            showSpinner: false,
            responseStatus: "",
            responseMsg: "",
        }

        this.statusTimeout = null;

    }


    componentDidMount() {

        let searchParams = new URLSearchParams(this.props.location.search);

        const shouldEdit = searchParams.get("shouldEdit"),
            postId = searchParams.get("postId");

        if (shouldEdit && postId) this.loadPost(postId);

    }

    componentWillUnmount() {
        clearTimeout(this.statusTimeout);
    }


    loadPost = (postId) => {


        this.setState({
            showSpinner: true,
            postId: postId
        });

        axios.get(
            "/getPost/" + postId)
            .then(result => {

                let components = result.data.post.components;

                for (let i = 0; i < components.length; i++) {
                    components[i].dragable = true;
                    components[i].ref = React.createRef();
                }


                this.setState({
                    showSpinner: false,
                    components: components,
                    title: result.data.post.title,
                    featuredImage: result.data.post.featuredImage,
                    postDescription: result.data.post.description
                })

            })
            .catch(error => {
                handleAxiosError(error, this.setResponsePreview, "Loading Failed...")
            })

    }

    savePost = (e, saveFromModal = false) => {


        const {title, featuredImage, postDescription, postId} = this.state;

        if (title === "") {
            this.setState({showPostModal: true});
            return;
        }


        if (this.state.components.length < 1) {
            if (saveFromModal) return;
            alert('Please add content before svaing the Post!');
            return;
        }


        this.setState({
            responseMsg: "Saving...",
            responseStatus: 'saving',
        })

        let componentsToSave = [];

        for (let i = 0; i < this.state.components.length; i++) {
            componentsToSave.push({...this.state.components[i]});

            componentsToSave[i].dragging = false;
            componentsToSave[i].focused = false;
            componentsToSave[i].selected = false;
            componentsToSave[i].dragable = false;

            // removing ref to avoid circular object errors
            delete componentsToSave[i].ref;
        }


        let urlRoute = '/savePost',
            reqBody = {
                components: componentsToSave,
                title: title,
                featuredImage: featuredImage,
                postDescription: postDescription
            };


        if (postId) {
            urlRoute = '/updatePost';
            reqBody.postId = postId;
        }


        axios.post(urlRoute, JSON.stringify(reqBody))
            .then(result => {

                this.setState({
                    postId: result.data.id
                });

                this.setResponsePreview("success", "Post saved successfully.")

                if (!postId)
                    this.props.history.replace({
                            pathname: '/editor',
                            search: ("postId=" + result.data.id + "&shouldEdit=" + true)
                        })

            })
            .catch(error => {
                handleAxiosError(error, this.setResponsePreview, "Failed to save post.")
            })

    }

    showSidebarComponents = () => {
        this.setState({showComponents: true})
    }

    showSidebarStyles = () => {
        this.setState({showComponents: false})
    }

    updateComponents = (components) => {
        this.setState({components: components})
    }

    updateSingleComponent = (component) => {


        let components = [...this.state.components];

        let index = getCompIndex(component.randID, this.state.components);

        if (index >= 0) {
            components[index] = component;
            this.updateComponents(components);
        }

    }

    updateStyles = (id, style) => {

        let index = getCompIndex(id, this.state.components);
        if (index < 0) return;


        let components = [...this.state.components];
        let compStyles = {...components[index].styles};
        // console.log(style.property);

        let prop = style.property;
        compStyles[prop.toString()] = {
            value: style.value,
            unit: style.unit || ""
        };

        components[index].styles = compStyles;
        this.updateComponents(components);

    }

    updateAttribute = (id, attribute) => {

        let index = getCompIndex(id, this.state.components);
        if (index < 0) return;


        let components = [...this.state.components];
        components[index].attributes[attribute.name] = attribute.value;


        this.updateComponents(components);
    }

    hideStatusBar = () => {

        this.statusTimeout = setTimeout(() => {
            this.setState({showSavingLoader: false, saveStatus: null});
            this.statusTimeout = null;
        }, 3000);

    }


    showModal = () => {
        this.setState({
            showPostModal: true
        })
    }

    hideModal = () => {
        this.setState({
            showPostModal: false
        })
    }

    updatedPostDetails = (e) => {
        const detailName = e.target.id,
            value = e.target.value;
        this.setState({
            [detailName]: value
        })

    }

    setResponsePreview = (status, msg) => {
        this.setState({
            responseMsg: msg,
            responseStatus: status
        })
    }


    render() {

        let sidebar, showResponse;

        showResponse = this.state.responseStatus !== "" ?
            <ShowResponse
                status={this.state.responseStatus}
                message={this.state.responseMsg}
                postID={this.state.postId}
                hideMe={() => this.setState({responseStatus: ""})}
            /> : null;


        if (this.state.showComponents)
            sidebar = <EditorComponents/>;
        else {
            let index = getSelectedCompIndex(this.state.components);
            let styles = {}, id = "";
            if (index >= 0) {
                styles = this.state.components[index].styles;
                id = this.state.components[index].randID;
            }

            sidebar = <EditorStylesSidebar
                styles={styles}
                id={id}
                updateStyles={this.updateStyles}
                updateAttribute={this.updateAttribute}
                updateSingleComponent={this.updateSingleComponent}
                component={this.state.components[index]}
            />;
        }


        return (
            <div className="editor">
                {showResponse}
                <EditorModal
                    showPostModal={this.state.showPostModal}
                    hideModal={this.hideModal}
                    savePost={(e) => this.savePost(e, true)}
                    title={this.state.title}
                    featuredImage={this.state.featuredImage}
                    postDescription={this.state.postDescription}
                    updatedPostDetails={this.updatedPostDetails}
                />
                <EditorHeader
                    postID={this.state.postId}
                    showComponents={this.state.showComponents}
                    showSidebarComponents={this.showSidebarComponents}
                    showSidebarStyles={this.showSidebarStyles}
                    savePost={this.savePost}
                    showModal={this.showModal}
                />
                <EditorWindow
                    components={this.state.components}
                    updateComponents={this.updateComponents}
                    showSidebarStyles={this.showSidebarStyles}
                    showSidebarComponents={this.showSidebarComponents}
                />
                {sidebar}
            </div>
        );

    }


}


export default Editor;
