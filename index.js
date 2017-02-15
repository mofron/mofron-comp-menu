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
    
    constructor (prm, opt) {
        try {
            super(prm);
            this.name('Menu');
            
            this.sel_evt = function(){};
            this.sel_idx = null;
            this.m_size  = new Array(30,150);
            
            if (null !== opt) {
                this.option(opt);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            this.target(this.vdom());
            
            if (null !== prm) {
                if ('object' !== (typeof prm)) {
                    throw new Error('invalid parameter');
                }
                for (var idx in prm) {
                    this.addChild(prm[idx]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectIndex (idx) {
        try {
            if (undefined === idx) {
                return this.sel_idx;
            }
            if ('number' !== (typeof idx)) {
                throw new Error('invalid parameter : ' + idx);
            }
            this.sel_idx = idx;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectEvent (evt) {
        try {
            if (undefined === evt) {
                /* getter */
                return this.sel_evt;
            }
            /* setter */
            if ('function' !== (typeof evt)) {
                throw new Error('invalid parameter');
            }
            this.sel_evt = evt;
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
                        var chdlen = menu.getChild();
                        for (var idx in chdlen) {
                            if (chdlen[idx].vdom().getChild(0).getId() === item.vdom().getChild(0).getId()) {
                                menu.selectIndex(parseInt(idx));
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
                new mofron.event.Click(this.sel_evt,this)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
