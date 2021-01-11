const accordionDataOptions = {
    state: {
        dataValue: 'data-state',
        open: "open",
        closed: "closed",
    },
};

let accordions = document.getElementsByClassName("accordion");

Array.from(accordions).forEach( function(accordion) {
    accordion.addEventListener('click', function (){

        let accordionStates = accordionDataOptions.state;
        let accordionState = accordion.getAttribute(accordionStates.dataValue);

        accordionState = accordionState === null || accordionState === "" ? accordionStates.closed : accordionState;
        accordionState = (accordionState === accordionStates.open) || (accordionState === accordionStates.closed) ? accordionState : accordionStates.closed;

        if (accordionState === accordionStates.open){
            accordion.setAttribute(accordionStates.dataValue, accordionStates.closed);
        }else{
            accordion.setAttribute(accordionStates.dataValue, accordionStates.open);
        }

    })
});