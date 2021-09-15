
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export function getCompIndex(components,id) {
    return components.findIndex(comp => comp.randID === id);
}

export function getDraggingIndex(components) {
    return components.findIndex(comp => comp.dragging);
}

export function getBreakerIndex(components) {
    return components.findIndex(comp => comp.type === "breaker");
}

export function getSelectedCompIndex(components) {
    return components.findIndex(comp => comp.selected || comp.focused);
}

export function getSelectedCompIndexExceptThis(components, exceptThisID) {
    return components.findIndex(comp => ((comp.selected || comp.focused) && comp.randID !== exceptThisID));
}



export function getInsertSide(component, event, isInside = false) {

    let clickX = event.clientX;
    let clickY = event.clientY;

    let box = component.ref.current.getBoundingClientRect();

    let dislpay = getComputedStyle(component.ref.current).display;


    let {width, height, left, top} = box;


    if (dislpay === "inline" || dislpay === "inline-block") {

        if (!isInside) {
            if (clickX < left) return 0; // on left (before)
            else return 1; //on right (after)
        }

        let center = width / 2;
        let x = Math.abs(clickX - left);

        if (center > x) return 0; // on left (before)
        else return 1; //on right (after)

    } else {


        if (!isInside) {
            if (clickY < top) return 0; // on top (before)
            else return 1; //on bottom (after)
        }

        let center = height / 2;
        let y = Math.abs(clickY - top);

        if (center > y) return 0; // on top (before)
        else return 1; //on bottom (after)


    }


}

export function getNearestElement(components, event, updateCords) {
    // Check if click is inside any of the buttons
    let clickX = event.clientX;
    let clickY = event.clientY;

    updateCords(event);


    var comp;

    for (let i in components) {
        comp = components[i];
        let box = comp.ref.current.getBoundingClientRect();

        let topLeftX = box.x;
        let topLeftY = box.y;
        let bottomRightX = box.right;
        let bottomRightY = box.bottom;

        if ((clickX >= topLeftX && clickX <= bottomRightX) &&
            (clickY >= topLeftY && clickY <= bottomRightY)) {
            return {element: components[i], isInside: true, index: i};
        }
    }

    // Now calculate distances
    var distances = [];

    for (let i in components) {
        comp = components[i];
        let box = comp.ref.current.getBoundingClientRect();

        let topLeftX = box.x;
        let topLeftY = box.y;
        let bottomRightX = box.right;
        let bottomRightY = box.bottom;

        if ((clickX >= topLeftX && clickX <= bottomRightX)) {
            distances[i] = Math.min(Math.abs(clickY - topLeftY), Math.abs(clickY - bottomRightY));
        } else if ((clickY >= topLeftY && clickY <= bottomRightY)) {
            distances[i] = Math.min(Math.abs(clickX - topLeftX), Math.abs(clickX - bottomRightX));
        } else {
            distances[i] = Math.sqrt(
                (Math.pow(
                    Math.min(
                        Math.abs(clickX - topLeftX),
                        Math.abs(clickX - bottomRightX)
                    ), 2)) +
                (Math.pow(Math.min(Math.abs(clickY - topLeftY), Math.abs(clickY - bottomRightY)), 2))
            );
        }
    }

    var min_id = 0;
    for (let j in distances) {
        if (distances[j] < distances[min_id]) {
            min_id = j;
        }
    }

    return {element: components[min_id], isInside: false, index: min_id};

}

