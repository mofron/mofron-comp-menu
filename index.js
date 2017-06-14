/**
 * @file   mofron-comp-menu/index.js
 * @author simpart
 */
require('mofron-event-click');

/**
 * @class Menu
 * @brief menu component for mofron
 */
mofron.comp.Menu = class extends mofron.Component {
    /**
     * initialize menu component
     *
     * @param prm_opt (object) menu element array
     * @param prm_opt (object) option
     */
    constructor (prm_opt) {
        try {
            super();
            this.name('Menu');
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            this.vdom().addChild(
                new mofron.Dom('div',this)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectIdx (idx, evt) {
        try {
            if (undefined === idx) {
                /* getter */
                return (undefined === this.m_selidx) ? null : this.m_selidx;
            }
            /* setter */
            if ('number' !== (typeof idx)) {
                throw new Error('invalid parameter : ' + idx);
            }
            var _evt      = (undefined === evt) ? false : evt;
            this.m_selidx = idx;
            /* set select index (for dynamic chaging) */
            if ( (true  === this.target().isPushed()) &&
                 (false === _evt) ) {
                this.child()[this.selectIdx()].getRowDom().click();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectEvt (evt, prm) {
        try {
            if (undefined === evt) {
                /* getter */
                return (undefined === this.m_selevt) ? null : this.m_selevt;
            }
            /* setter */
            if ('function' !== (typeof evt)) {
                throw new Error('invalid parameter');
            }
            this.m_selevt = [evt,prm];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    elemSize (x, y) {
        try {
            if ((undefined === x) && (undefined === y)) {
                /* getter */
                if (undefined === this.m_size) {
                    this.elemSize(150, 30);
                }
                return this.m_size;
            }
            /* setter */
            if ( (('string' !== typeof x) && ('number' !== typeof x)) ||
                 (('string' !== typeof y) && ('number' !== typeof y)) ) {
                throw new Error('invalid parameter');
            }
            this.m_size = [x, y];
            var chd = this.child();
            for (var chd_idx in chd) {
                this.setSizeComp(chd[chd_idx]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSizeComp (cmp) {
        try {
            var x = ('number' === typeof this.elemSize()[0]) ? this.elemSize()[0] + 'px' : this.elemSize()[0];
            var y = ('number' === typeof this.elemSize()[1]) ? this.elemSize()[1] + 'px' : this.elemSize()[1];
            if ( ('function' === typeof cmp['height']) &&
                 ('function' === typeof cmp['width'])) {
                cmp.width(x);
                cmp.height(y);
            } else if ('function' === typeof cmp['size']) {
                cmp.size(x, y);
            } else {
                cmp.style({
                    width  : x,
                    height : y
                });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(comp, disp) {
        try {
            super.addChild(comp, disp);
            this.setSizeComp(comp);
            
            comp.addEvent(this.getClickEvent());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getClickEvent () {
        try {
            return new mofron.event.Click(
                (tgt, prm) => {
                    try {
                        let chd = prm.child();
                        for (var idx in chd) {
                            if (chd[idx].getId() === tgt.getId()) {
                                prm.selectIdx(parseInt(idx), true);
                                break;
                            }
                        }
                        
                        let sel_evt = prm.selectEvt();
                        if (null !== sel_evt) {
                            sel_evt[0](prm, sel_evt[1]);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.menu = {};
module.exports = mofron.comp.Menu;
