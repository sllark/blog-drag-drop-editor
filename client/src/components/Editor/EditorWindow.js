import React from "react";
import getPostComponents from "../../helper/getPostComponents";


import * as componetFinders from '../../helper/componentFinders';


function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

let imgUrl = [
    "https://apicms.thestar.com.my/uploads/images/2020/05/15/682869.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
    "https://images.ctfassets.net/cnu0m8re1exe/5wWw8nPC87ey6Xeh4ih9tP/43ff965197a414dc4771810c65b3da09/cristina-gottardi-177261-unsplash.jpg?w=650&h=433&fit=fill",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/447px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg",
    "https://www.godrejinterio.com/imagestore/B2C/56101543SD00116/56101543SD00116_01_803x602.png"

]


class EditorWindow extends React.Component {


    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();

        this.state = {
            draggingPrevCords: [0, 0],
            draggingComp: null,
            draggingCompLeftOutside: null
        }

    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleMouseClick);
        document.addEventListener('keyup', this.handleMouseClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseClick);
        document.removeEventListener('keyup', this.handleMouseClick);
    }

    handleMouseClick = (e) => {
        let isEditorClicked = e.target.closest('.editorMainWindow');
        if (!isEditorClicked) return

        let classList = e.target.classList;
        if (classList.contains('copyControl')) {
            this.copyComponent(e.target.dataset.id)
        } else if (classList.contains('deleteControl')) {
            this.deleteComponent(e.target.dataset.id)

        } else if (classList.contains('editorMainWindow')) {
            this.compBlurHandler(e.target.dataset.id);
        } else {
            let id = e.target.dataset.id;
            this.compBlurHandler(id, true);
            this.compClickHandler(id);
        }

    }

    onDropHandler = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("type");

        if (data) {
            // new component dropped
            let comp = getNewComponent()
            comp = addComponentData(comp, data);


            let components = [...this.props.components];


            if (components.length === 0) {
                components.splice(0, 0, comp);
            } else {

                let elementAfter = componetFinders.getNearestElement(components, e, this.updateCords);
                let shouldInsertAfter = componetFinders.getInsertSide(elementAfter.element, e, elementAfter.isInside);

                let insertIndex = elementAfter.index;

                if (shouldInsertAfter) components.splice(Number(insertIndex) + 1, 0, comp);
                else components.splice(insertIndex, 0, comp);

                let index = componetFinders.getBreakerIndex(components, e.clientY);
                if (index >= 0)
                    components.splice(index, 1);
            }

            this.props.updateComponents(components);


        } else {
            //old component dropped

            let components = [...this.props.components];
            let breakerIndex = componetFinders.getBreakerIndex(components);


            if (breakerIndex >= 0 && this.state.draggingComp) {
                let draggingComp = {...this.state.draggingComp};
                draggingComp.dragging = false;

                components.splice(breakerIndex, 1, draggingComp);

                this.setState({draggingComp: null})
                this.props.updateComponents(components);

            }

        }
    }

    onDragOverHandler = (e) => {
        e.preventDefault();
        if (this.state.draggingPrevCords[0] === e.clientX && this.state.draggingPrevCords[1] === e.clientY) return;


        let components = [...this.props.components];
        let draggingIndex = componetFinders.getDraggingIndex(components),
            breaker;

        // remove comp being dragged and add lineBreaker instead
        if (draggingIndex >= 0) {
            let removedComp = components.splice(draggingIndex, 1)[0];
            this.setState({draggingComp: removedComp})
        }

        let breakerIndex = componetFinders.getBreakerIndex(components);

        if (breakerIndex >= 0) breaker = components.splice(breakerIndex, 1)[0];
        else breaker = getNewBreaker();


        let elementAfter = componetFinders.getNearestElement(components, e, this.updateCords);

        if (!elementAfter.element) {
            components.push(breaker);
        } else {
            let shouldInsertAfter = componetFinders.getInsertSide(elementAfter.element, e, elementAfter.isInside);
            let insertIndex = elementAfter.index;

            if (shouldInsertAfter) components.splice(Number(insertIndex) + 1, 0, breaker);
            else components.splice(insertIndex, 0, breaker);

        }


        this.props.updateComponents(components);

    }

    onDragEndHandler = (e) => {
        if (!e.relatedTarget) return;

        //target = leaving from
        //relatedTarget =  leaving to
        //if dragging element is taken out of editor window
        if (
            (e.target.classList.contains('editorMainWindow')
                || !!e.target.closest('.editorMainWindow')) &&
            !e.relatedTarget.closest('.editorMainWindow')
        ) {


            let components = [...this.props.components];
            const index = componetFinders.getBreakerIndex(components);

            if (index >= 0 && this.state.draggingComp) {

                let draggingComp = {...this.state.draggingComp};
                draggingComp.dragging = false;
                components.splice(index, 1, draggingComp);

                draggingComp.dragging = true;

                this.setState({draggingComp: null, draggingCompLeftOutside: draggingComp});
                this.props.updateComponents(components);

            } else if (index >= 0) {
                components.splice(index, 1);
                this.props.updateComponents(components);
            }

        }

    }

    compClickHandler = (id) => {

        let components = [...this.props.components];
        const index = componetFinders.getCompIndex(components, id);
        if (index < 0) return


        if (components[index].selected) components[index].focused = true;
        components[index].selected = true;

        this.props.updateComponents(components);
        this.props.showSidebarStyles();
    }

    compBlurHandler = (id, exceptThis = false) => {

        let components = [...this.props.components];

        let index = exceptThis ?
            componetFinders.getSelectedCompIndexExceptThis(components, id) :
            componetFinders.getSelectedCompIndex(components);

        if (index < 0) return

        components[index].content = components[index].ref.current.innerText;
        components[index].selected = false;
        components[index].focused = false;

        this.props.updateComponents(components);
        this.props.showSidebarComponents();
    }

    compDragStart = (e) => {

        var id = e.target.dataset.id;
        if (!id) return;

        let components = [...this.props.components];
        const index = componetFinders.getCompIndex(components, id);
        if (index >= 0) components[index].dragging = true;

        if (this.state.draggingCompLeftOutside) {
            const prevDragIndex = componetFinders.getCompIndex(components, this.state.draggingCompLeftOutside.randID);

            if (prevDragIndex >= 0) {
                if (components[prevDragIndex].randID !== id) components[prevDragIndex].dragging = false;
                this.setState({draggingCompLeftOutside: null});
            }

        }

        this.props.updateComponents(components);
    }

    compDragEnd = (e) => {
        e.preventDefault();

        var id = e.target.dataset.id;
        if (!id) return;

        let components = [...this.props.components];
        const index = componetFinders.getCompIndex(components, e.target.dataset.id);

        if (index < 0) return;

        components[index].dragging = false;
        this.props.updateComponents(components);
    }

    updateCords = (e) => {
        this.setState({draggingPrevCords: [e.clientX, e.clientY]})
    }

    copyComponent = (id) => {

        let components = [...this.props.components];

        let compIndex = componetFinders.getCompIndex(components, id);

        if (compIndex >= 0) {
            let clonComp = {...components[compIndex]};
            clonComp.randID = guidGenerator();
            clonComp.selected = false;
            clonComp.focused = false;
            clonComp.dragging = false;
            clonComp.ref = React.createRef();

            components.splice(compIndex + 1, 0, clonComp);
            this.props.updateComponents(components);
        }

    }

    deleteComponent = (id) => {
        let components = [...this.props.components];

        let compIndex = componetFinders.getCompIndex(components, id);

        if (compIndex >= 0) {
            components.splice(compIndex, 1);
            this.props.updateComponents(components);
        }
    }

    render() {

        let mainWindow = "No Elements added";



        if (this.props.components.length)
            mainWindow = getPostComponents(this.props.components, this.compDragStart, this.compDragEnd);


        return (
            <div className="editorMainWindow"
                 onDrop={this.onDropHandler}
                 onDragOver={this.onDragOverHandler}
                 onDragLeave={this.onDragEndHandler}
                 ref={this.wrapperRef}
            >
                {mainWindow}
            </div>
        )

    }


}

export default EditorWindow;


const getNewComponent = () => {


    let randID = guidGenerator();
    return {
        content: "",
        randID: randID,
        selected: false,
        focused: false,
        dragging: false,
        dragable: true,
        ref: React.createRef(),
        styles: {
            display: {
                value: 'block',
            },
            borderStyle: {
                value: 'solid',
            },
            textAlign: {
                value: 'left',
            },
            fontWeightValue: {
                value: '500',
            },
            borderColor: {
                value: '#292929',
            },
            color: {
                value: '#292929',
            },
            opacity: {
                value: '100',
                unit: '%'
            },
            fontSize: {
                value: 20,
                unit: 'px'
            }
        },
        attributes: {},
    };

}


const addComponentData = (comp, type) => {


    switch (type) {

        case "p":
            comp.content = "This is a paragraph.";
            comp.type = "p";
            comp.windowComp = "WindowText";
            break;

        case "img":

            comp.styles.display.value = 'inline';
            comp.styles.width = {};
            comp.styles.height = {};
            comp.styles.width.value = 100;
            comp.styles.width.unit = 'px';
            comp.styles.height.value = 200;
            comp.styles.height.unit = 'px';


            comp.type = "img";
            comp.windowComp = "WindowImg";

            comp.attributes.src = imgUrl[Math.floor(Math.random() * 5)];
            break;

        case "button":
            comp.attributes.target = '_blank';
            comp.styles.display.value = 'inline-block';

            comp.content = "Button";
            comp.type = "button";
            comp.windowComp = "CompButton";
            comp.isLink = true;
            break;


        case "heading":
            comp.styles.display.value = 'block';
            comp.styles.fontSize.value = 40;


            comp.content = "Heading";
            comp.headingType = 'h1';
            comp.type = "heading";
            comp.windowComp = "CompHeading";
            break;

        default:
            comp.type = "div";
            comp.windowComp = "WindowDiv";
            break;

    }

    return comp;
}

const getNewBreaker = () => {
    return {
        randID: guidGenerator(),
        ref: React.createRef(),
        type: "breaker",
        windowComp: "windowBR"
    }
}
