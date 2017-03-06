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
            
            this.m_selevt = function(){};
            this.m_selidx = null;
            this.m_size   = new Array(30,150);
            
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            var menu = new mofron.Dom('div',this);
            this.vdom().addChild(menu);
            this.target(menu);
            
            if (null !== prm) {
                if ( ('object'  !== typeof prm) ||
                     (undefined === prm[0]) ) {
                    throw new Error('invalid parameter');
                }
                for (var idx in prm) {
                    if (true !== mofron.func.isInclude(prm[idx], 'Component')) {
                        throw new Error('invalid parameter');
                    }
                    this.addChild(prm[idx]);
                }
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
                return this.m_selidx;
            }
            /* setter */
            if ('number' !== (typeof idx)) {
                throw new Error('invalid parameter : ' + idx);
            }
            var _evt = (undefined === evt) ? false : evt;
            this.m_selidx = idx;
            if ( (true  === this.isRendered()) &&
                 (false === _evt) ) {
                this.child()[this.selectIdx()].getRowDom().click();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectEvt (evt) {
        try {
            if (undefined === evt) {
                /* getter */
                return this.m_selevt;
            }
            /* setter */
            if ('function' !== (typeof evt)) {
                throw new Error('invalid parameter');
            }
            this.m_selevt = evt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    size (hei, wid) {
        try {
            if ((undefined === hei) && (undefined === wid)) {
                /* getter */
                return this.m_size;
            }
            /* setter */
            if (('string' !== typeof hei) && ('number' !== typeof hei)) {
                throw new Error('invalid parameter');
            }
            if (('string' !== typeof wid) && ('number' !== typeof wid)) {
                throw new Error('invalid parameter');
            }
            
            var chd = this.getChild();
            for (var chd_idx in chd) {
                this.sizeComp(chd[chd_idx],hei,wid);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    sizeComp (cmp, hei, wid) {
        try {
            var set_hei = hei;
            var set_wid = wid;
            if ('number' === typeof hei) {
                set_hei = hei + 'px';
            }
            if ('number' === typeof wid) {
                set_wid = wid + 'px';
            }
            
            if ( ('function' === typeof cmp['height']) &&
                 ('function' === typeof cmp['width'])) {
                cmp.height(set_hei);
                cmp.width(set_wid);
            } else {
                cmp.style('height', set_hei);
                cmp.style('width' , set_wid);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(comp, disp) {
        try {
            super.addChild(comp, disp);
            
            var size = this.size();
            this.sizeComp(comp, size[0],size[1]);
            
            comp.addEvent(
                new mofron.event.Click(function(evt) {
                    try {
                        var menu   = evt[0];
                        var item   = evt[1];
                        var chdlen = menu.child();
                        for (var idx in chdlen) {
                            if (chdlen[idx].vdom().child()[0].getId() === item.vdom().child()[0].getId()) {
                                menu.selectIdx(parseInt(idx), true);
                                break;
                            }
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },[this,comp])
            );
            comp.addEvent(
                new mofron.event.Click(this.m_selevt,this)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.menu = {};
module.exports = mofron.comp.Menu;
