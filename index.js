/**
 * @file   mofron-comp-menu/index.js
 * @author simpart
 */
let mf     = require('mofron');
let Click  = require('mofron-event-click');
let Center = require('mofron-effect-center');
let Text   = require('mofron-comp-text');

/**
 * @class Menu
 * @brief menu component for mofron
 */
mf.comp.Menu = class extends mf.Component {
    /**
     * initialize menu component
     *
     * @param prm_opt (object) menu element array
     * @param prm_opt (object) option
     */
    constructor (po) {
        try {
            super();
            this.name('Menu');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (val, flg) {
        try {
            let ret = super.width(val);
            if (false !== flg) {
                this.setMenuConf();
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (val, flg) {
        try {
            let ret = super.height(val);
            if (false !== flg) {
                this.setMenuConf();
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setMenuConf (cmp) {
        try {
            if (undefined === cmp) {
                /* set all contents */
                let chd = this.child();
                for (let cidx in chd) {
                    this.setMenuConf(chd[cidx]);
                }
            } else {
                /* set parameter contents */
                let wid = this.width(undefined, false);
                let hei = this.height(undefined, false);
                if (null !== wid) {
                    if (true === this.horizon()) {
                        cmp.width(wid / this.child().length + 'px', false);
                    } else {
                        cmp.width(wid);
                    }
                }
                if (null !== hei) {
                    if (true !== this.horizon()) {
                        cmp.height(hei / this.child().length + 'px', false);
                    } else {
                        cmp.height(hei);
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    horizon (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                let disp = this.target().style('display');
                return (disp === null) ? false : true;
            } else {
                /* setter */
                this.target().style({
                    'display' : (true === flg) ? 'flex' : null
                });
            }
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
    
    addChild(comp, idx) {
        try {
            comp.addEvent(this.getClickEvent());
            let set_cmp = comp;
            if (true === mf.func.isInclude(comp, 'Button')) {
                set_cmp = new mf.Component({
                              styleTgt : comp.styleTgt(),
                              addChild : comp
                          });
            }
            super.addChild(set_cmp);
            this.setMenuConf();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getClickEvent () {
        try {
            return new Click(
                (tgt, prm) => {
                    try {
                        let chd = prm.child();
                        for (var idx in chd) {
                            if (chd[idx].getId() === tgt.getId()) {
                                prm.selectIdx(parseInt(idx), true);
                                break;
                            }
                        }
                        /* exec callback */
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
module.exports = mofron.comp.Menu;
