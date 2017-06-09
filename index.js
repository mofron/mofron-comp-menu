/**
 * @file Click.js
 * @author simpart
 */

/**
 * @class mofron.event.Click
 * @brief click event class for component
 */
mofron.event.Click = class extends mofron.Event {
    
    constructor (fnc, prm) {
        try {
            super();
            this.name('Click');
            
            /* font theme */
            this.m_pointer = true;
            
            if ('object' === fnc) {
                this.prmOpt(fnc);
            } else {
                this.handler(fnc, prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * add click event to target component.
     */
    eventConts (tgt_dom) {
        try {
            var evt_func = this.handler(); 
            if (true === this.pointer()) {
                this.target().style({
                    'cursor' :  'pointer'
                });
            }
            let tgt = this.target();
            tgt_dom.getRawDom().addEventListener('click',function() {
                try {
                    if (null != evt_func[0]) {
                        evt_func[0](tgt, evt_func[1]);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            },false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    pointer (flg) {
        try {
            if (undefined === flg) {
                return this.m_pointer;
            }
            
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.m_pointer = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.event.Click;
