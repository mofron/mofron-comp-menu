/**
 * @file   mofron-comp-menu/index.js
 * @author simpart
 */
let mf     = require('mofron');
let Click  = require('mofron-event-click');
let Center = require('mofron-effect-center');
require('mofron-comp-text');

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
    
    addConts (cnt) {
        try {
            if ('object' !== typeof cnt) {
                throw new Error('invalid parameter');
            }
            for (let cidx in cnt) {
                if ('string' === typeof cnt[cidx]) {
                    let txt = this.theme().component('mofron-comp-text');
                    txt.execOption({
                        text      : cnt[cidx],
                        size      : 25,
                        addEffect : new Center(true,false)
                    });
                    
                    let wrp = new mf.Component({
                        addChild : txt,
                        style    : {
                            'display'     : 'flex',
                            'align-items' : 'center'
                        }
                    });
                    this.setMenuConf(wrp);
                    this.addChild(wrp);
                } else  {
                    this.addChild(cnt[cidx]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    size (x, y) {
        try {
            if (undefined === x) {
                /* getter */
                return (undefined === this.m_size) ? null : this.m_size;
            }
            /* setter */
            if ( ((null !== x) && ('number' !== typeof x)) ||
                 ((null !== y) && ('number' !== typeof y)) ) {
                throw new Error('invalid paramter');
            }
            if (undefined === this.m_size) {
                this.m_size = new Array(null, null);
            }
            if ('number' === typeof x) {
                this.m_size[0] = x;
            }
            if ('number' === typeof y) {
                this.m_size[1] = y;
            }
            this.setMenuConf();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    margin (x, y) {
        try {
            if (undefined === x) {
                /* getter */
                return (undefined === this.m_margin) ? null : this.m_margin;
            }
            /* setter */
            if ( ((null !== x) && ('number' !== typeof x)) ||
                 ((null !== y) && ('number' !== typeof y)) ) {
                throw new Error('invalid paramter');
            }
            if (undefined === this.m_margin) {
                this.m_margin = new Array(null, null);
            }
            if ('number' === typeof x) {
                this.m_margin[0] = x;
            }
            if ('number' === typeof y) {
                this.m_margin[1] = y;
            }
            this.setMenuConf();
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
                if (null !== this.size()) {
                    cmp.style({
                        'width'  : (null === this.size()[0]) ? undefined : this.size()[0] + 'px',
                        'height' : (null === this.size()[1]) ? undefined : this.size()[1] + 'px'
                    });
                } else if (null !== this.margin()) {
                    let xmrg = (null === this.margin()[0]) ? 0 : this.margin()[0];
                    let ymrg = (null === this.margin()[1]) ? 0 : this.margin()[1];
                    cmp.style({
                        'margin-top'    : ymrg + 'px',
                        'margin-right'  : xmrg + 'px',
                        'margin-bottom' : ymrg + 'px',
                        'margin-left'   : xmrg + 'px'
                    });
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
    
    addChild(comp) {
        try {
            super.addChild(comp);
            comp.addEvent(this.getClickEvent());
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
mofron.comp.menu = {};
module.exports = mofron.comp.Menu;
