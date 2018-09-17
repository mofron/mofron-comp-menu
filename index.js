/**
 * @file   mofron-comp-menu/index.js
 * @author simpart
 */
const mf     = require('mofron');
const Click  = require('mofron-event-click');
const Relat  = require('mofron-layout-relative');

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
    
    width (prm) {
        try {
            let ret = super.width(prm);
            if (undefined === ret) {
                /* setter */
                let siz = this.sizeValue('width');
                let chd = this.child();
                for (let cidx in chd) {
                    if (true === this.horizon()) {
                        chd[cidx].width(
                            (siz.value() / this.child().length) + siz.type()
                        );
                    } else {
                        chd[cidx].width(this.width());
                    }
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            let ret = super.height(prm);
            if (undefined === ret) {
                /* setter */
                let siz = this.sizeValue('height');
                let chd = this.child();
                for (let cidx in chd) {
                    if (true === this.horizon()) {
                        chd[cidx].height(this.height());
                    } else {
                        chd[cidx].height(
                            (siz.value() / this.child().length) + siz.type()
                        );
                    }
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    horizon (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return ('flex' === this.style('display')) ? true : false;
            } else {
                /* setter */
                this.style({ 'display' : (true === flg) ? 'flex' : null });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectIndex (idx) {
        try {
            if (undefined === idx) {
                /* getter */
                return (undefined === this.m_selidx) ? null : this.m_selidx;
            }
            /* setter */
            if (('number' !== typeof idx) || (undefined === this.child()[idx])) {
                throw new Error('invalid parameter : ' + idx);
            }
            this.child()[idx].eventTgt().getRawDom.click();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectEvent (evt, prm) {
        try {
            if (undefined === evt) {
                /* getter */
                return (undefined === this.m_selevt) ? [] : this.m_selevt;
            }
            /* setter */
            if ('function' !== (typeof evt)) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_selevt) {
                this.m_selevt = [];
            }
            this.m_selevt.push([evt, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execSelect (idx) {
        try {
            if (('number' !== typeof idx) || (undefined === this.child()[idx])) {
                throw new Error('invalid parameter : ' + idx);
            }
            this.m_selidx = idx;
            let evt = this.selectEvent();
            for (let eidx in evt) {
                evt[eidx][0](idx, evt[eidx][1], this);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(chd, idx) {
        try {
            let ret = super.addChild(chd, idx);
            let clk = (p1, p2) => {
                try {
                    let chd = p2.child();
                    for (let cidx in chd) {
                        if (p1.getId() === chd[cidx].getId()) {
                            p2.execSelect(parseInt(cidx));
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            chd.execOption({ event : [ new Click(new mf.Param(clk, this)) ] });
            this.size(this.width(), this.height());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    offset (prm) {
        try {
            this.layout([
                new Relat((true === this.horizon()) ? 'left' : 'top', prm) 
            ]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Menu;
/* end of file */
