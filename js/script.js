/**
 * Noah Civilise - Portfolio Interactive Logic
 * Features:
 *  - Cockpit tab navigation (ARIA tabs, arrow keys, deep links, 3D camera waypoints)
 *  - Projects grid and one page per project (#projects/<id>), rendered from js/projects-data.js
 *  - Light / Dark mode toggle with state persistence
 *  - Resume preview dialog on desktop, direct PDF link elsewhere
 *  - Keyboard shortcuts (1-6 to switch tabs)
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeMode();
    initCockpitTabs();
    initDetailViews();
    initDialogs();
    initPdfPreview();
    initKeyboardShortcuts();
    applyRoute();
    window.addEventListener('popstate', applyRoute);
});

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function getLang() {
    return typeof currentLanguage !== 'undefined' ? currentLanguage : 'fr';
}

function t(key) {
    const dict = (typeof translations !== 'undefined' && translations[getLang()]) || {};
    return dict[key] ?? key;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Escaped text with **bold** and `code` spans
function richText(value) {
    return escapeHtml(value)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.+?)`/g, '<code>$1</code>');
}

function scrollBehavior() {
    return reducedMotionQuery.matches ? 'auto' : 'smooth';
}

/* -------------------------------------------------------------
 * 1. LIGHT / DARK THEME MODE
 * ----------------------------------------------------------- */
function initThemeMode() {
    const toggleBtn = document.getElementById('theme-mode-toggle');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const savedMode = localStorage.getItem('portfolio_theme_mode') || (prefersLight ? 'light' : 'dark');

    function updateToggleLabel() {
        if (!toggleBtn) return;
        const isLight = document.body.classList.contains('light-mode');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
        const label = t(isLight ? 'theme.toDark' : 'theme.toLight');
        toggleBtn.setAttribute('title', label);
        toggleBtn.setAttribute('aria-label', label);
    }

    function applyMode(mode) {
        document.body.classList.toggle('light-mode', mode === 'light');
        localStorage.setItem('portfolio_theme_mode', mode);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'light' ? '#f8fafc' : '#090d16');
        updateToggleLabel();

        if (window.portfolio3D) {
            window.portfolio3D.setColorMode(mode);
        }
    }

    applyMode(savedMode);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-mode');
            applyMode(isLight ? 'dark' : 'light');
        });
    }

    document.addEventListener('portfolio:languagechange', updateToggleLabel);
}

/* -------------------------------------------------------------
 * 2. ROUTING (#tab, #projects/<id> or #experience/<id>; #interests points to the profile)
 * ----------------------------------------------------------- */
// Tabs that own detail pages, and where their items, grid and page live
const DETAIL_VIEWS = {
    projects: {
        items: () => (typeof PROJECTS !== 'undefined' ? PROJECTS : []),
        overview: 'projects-overview',
        page: 'project-page',
        backKey: 'projects.back',
        opener: (id) => `project-btn-${id}`
    },
    experience: {
        items: () => (typeof EXPERIENCES !== 'undefined' ? EXPERIENCES : []),
        overview: 'experience-overview',
        page: 'experience-page',
        backKey: 'experience.back',
        opener: (id) => `experience-btn-${id}`
    }
};

function parseRoute() {
    const [tab, itemId] = window.location.hash.replace('#', '').split('/');
    return { tab: tab || 'profile', itemId: itemId || null };
}

function applyRoute() {
    const { tab, itemId } = parseRoute();
    if (tab === 'interests') {
        // Former tab, now the "Outside of code" section at the bottom of the profile
        window.switchTab('profile');
        document.getElementById('profile-interests-title')?.scrollIntoView({ block: 'center' });
        return;
    }
    const known = document.getElementById(`panel-${tab}`);
    window.switchTab(known ? tab : 'profile', { updateHash: false });
    if (known && DETAIL_VIEWS[tab]) {
        if (itemId && DETAIL_VIEWS[tab].items().some(item => item.id === itemId)) {
            showDetailPage(tab, itemId);
        } else {
            showOverview(tab);
        }
    }
}

/* -------------------------------------------------------------
 * 3. COCKPIT HUB TAB NAVIGATION
 * ----------------------------------------------------------- */
function initCockpitTabs() {
    const tabs = Array.from(document.querySelectorAll('.hub-tab'));
    const panels = document.querySelectorAll('.hub-panel');
    const navBar = document.querySelector('.hub-nav-bar');

    function switchTab(tabId, { focus = false, updateHash = true } = {}) {
        const target = tabs.find(tab => tab.dataset.tab === tabId);
        if (!target) return;

        tabs.forEach(tab => {
            const isActive = tab === target;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            tab.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach(panel => {
            const isMatch = panel.id === `panel-${tabId}`;
            panel.classList.toggle('active', isMatch);
            panel.hidden = !isMatch;
        });

        if (focus) target.focus();

        // Animate Three.js camera to the matching 3D landmark
        if (window.portfolio3D) {
            window.portfolio3D.goToTab(tabId);
        }

        if (updateHash) {
            // A tab click always lands on the tab itself (its overview, not a detail page)
            if (DETAIL_VIEWS[tabId]) showOverview(tabId);
            history.replaceState(null, '', `#${tabId}`);
        }
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));

        tab.addEventListener('keydown', (e) => {
            let next = null;
            if (e.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
            else if (e.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
            else if (e.key === 'Home') next = tabs[0];
            else if (e.key === 'End') next = tabs[tabs.length - 1];
            if (!next) return;
            e.preventDefault();
            switchTab(next.dataset.tab, { focus: true });
        });
    });

    document.querySelectorAll('[data-goto-tab]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link.dataset.gotoTab);
            scrollToNavIfHidden();
        });
    });

    function scrollToNavIfHidden() {
        // On small screens the button can sit below the fold of the tab bar: bring it back into view
        if (navBar && navBar.getBoundingClientRect().top < 0) {
            navBar.scrollIntoView({ block: 'start', behavior: scrollBehavior() });
        }
    }

    window.switchTab = switchTab;
    window.scrollToNavIfHidden = scrollToNavIfHidden;
}

/* -------------------------------------------------------------
 * 4. PROJECTS GRID AND DETAIL PAGE TRIGGERS
 * ----------------------------------------------------------- */
function initDetailViews() {
    renderProjects();

    Object.keys(DETAIL_VIEWS).forEach(tabKey => {
        const panel = document.getElementById(`panel-${tabKey}`);
        if (!panel) return;
        panel.addEventListener('click', (e) => {
            if (e.target.closest('[data-detail-back]')) {
                closeDetailPage(tabKey);
                return;
            }
            const trigger = e.target.closest('button[data-detail-id]');
            if (trigger) {
                // From a detail page (previous / next links), replace the history entry instead of stacking it
                const fromPage = !document.getElementById(DETAIL_VIEWS[tabKey].page).hidden;
                openDetailPage(tabKey, trigger.dataset.detailId, { replace: fromPage });
            }
        });
    });

    document.addEventListener('portfolio:languagechange', () => {
        renderProjects();
        Object.keys(DETAIL_VIEWS).forEach(tabKey => {
            const page = document.getElementById(DETAIL_VIEWS[tabKey].page);
            if (page && !page.hidden && page.dataset.currentId) {
                renderDetailPage(tabKey, page.dataset.currentId);
                setDetailTitle(tabKey, page.dataset.currentId);
            }
        });
    });
}

function renderProjects() {
    const lang = getLang();
    const featured = document.getElementById('projects-featured');
    const others = document.getElementById('projects-others');
    if (featured) {
        featured.innerHTML = PROJECTS.filter(p => p.featured).map(p => featuredCardHtml(p, lang)).join('');
    }
    if (others) {
        others.innerHTML = PROJECTS.filter(p => !p.featured).map(p => compactCardHtml(p, lang)).join('');
    }
}

function techPillsHtml(stack, max) {
    return stack.slice(0, max).map(s => `<span>${escapeHtml(s)}</span>`).join('');
}

function detailsButtonHtml(project, label) {
    return `
        <button type="button" class="card-details-btn" id="project-btn-${project.id}" data-detail-id="${project.id}"
                aria-labelledby="project-btn-${project.id} project-title-${project.id}">
            <span>${escapeHtml(label)}</span>
            <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </button>`;
}

function featuredCardHtml(project, lang) {
    const c = project[lang] || project.fr;
    const media = project.cover
        ? `<img src="${project.cover}" alt="" width="800" height="450" loading="lazy" decoding="async">`
        : `<i class="${project.icon}" aria-hidden="true"></i>`;
    const team = c.team ? `<span class="card-team">${escapeHtml(c.team)}</span>` : '';

    return `
        <article class="project-card is-featured">
            <div class="project-card-media${project.cover ? '' : ' is-icon'}">${media}</div>
            <div class="project-card-body">
                <div class="card-top-row">
                    <span class="card-category-badge">${escapeHtml(c.category)}</span>
                    ${team}
                </div>
                <h4 class="project-card-title" id="project-title-${project.id}">${escapeHtml(c.title)}</h4>
                <div class="card-metric-highlight">${escapeHtml(c.metric)}</div>
                <p class="card-summary">${escapeHtml(c.summary)}</p>
                <div class="card-tech-pills">${techPillsHtml(project.stack, 4)}</div>
                ${detailsButtonHtml(project, t(c.sections ? 'projects.caseStudy' : 'projects.details'))}
            </div>
        </article>`;
}

function compactCardHtml(project, lang) {
    const c = project[lang] || project.fr;

    return `
        <article class="project-card is-compact">
            <span class="card-icon-box"><i class="${project.icon}" aria-hidden="true"></i></span>
            <div class="compact-main">
                <h4 class="project-card-title" id="project-title-${project.id}">${escapeHtml(c.title)}</h4>
                <p class="card-summary">${escapeHtml(c.summary)}</p>
                <div class="card-tech-pills">${techPillsHtml(project.stack, 4)}</div>
            </div>
            ${detailsButtonHtml(project, t('projects.detailsShort'))}
        </article>`;
}

/* -------------------------------------------------------------
 * 5. DETAIL PAGES (case studies, deep-linkable as #<tab>/<id>)
 * ----------------------------------------------------------- */
let overviewScrollY = 0;

// History entries pushed when a detail page opens carry this marker (it survives reloads)
const DETAIL_STATE = { portfolioDetail: true };

function openDetailPage(tabKey, itemId, { replace = false } = {}) {
    if (!DETAIL_VIEWS[tabKey].items().some(item => item.id === itemId)) return;
    if (replace) {
        history.replaceState(history.state, '', `#${tabKey}/${itemId}`);
    } else {
        overviewScrollY = window.scrollY;
        history.pushState(DETAIL_STATE, '', `#${tabKey}/${itemId}`);
    }
    showDetailPage(tabKey, itemId);
}

function closeDetailPage(tabKey) {
    const pushedByUs = Boolean(history.state && history.state.portfolioDetail);
    // Update the view right away: some embedded previews never deliver the popstate event
    showOverview(tabKey);
    if (pushedByUs) {
        const detailHash = window.location.hash;
        history.back(); // drops the entry pushed on open; the popstate that follows is a no-op
        // Previews that ignore back(): fix the address so a reload does not reopen the page
        setTimeout(() => {
            if (window.location.hash === detailHash) history.replaceState(null, '', `#${tabKey}`);
        }, 400);
    } else {
        history.replaceState(null, '', `#${tabKey}`);
    }
}

function setDetailTitle(tabKey, itemId) {
    const item = DETAIL_VIEWS[tabKey].items().find(i => i.id === itemId);
    if (item) document.title = `${(item[getLang()] || item.fr).title} · Noah Civilise`;
}

function showDetailPage(tabKey, itemId) {
    const view = DETAIL_VIEWS[tabKey];
    const page = document.getElementById(view.page);
    const overview = document.getElementById(view.overview);
    if (!page || !overview || !renderDetailPage(tabKey, itemId)) return;

    overview.hidden = true;
    page.hidden = false;
    setDetailTitle(tabKey, itemId);

    const container = document.querySelector('.cockpit-container');
    if (container && container.getBoundingClientRect().top < 0) {
        container.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
    page.querySelector('.case-title')?.focus({ preventScroll: true });
}

function showOverview(tabKey) {
    const view = DETAIL_VIEWS[tabKey];
    const page = document.getElementById(view.page);
    const overview = document.getElementById(view.overview);
    if (!page || !overview) return;

    const lastItem = page.dataset.currentId;
    const wasOpen = !page.hidden;
    page.hidden = true;
    overview.hidden = false;
    page.dataset.currentId = '';
    document.title = t('meta.title');

    if (wasOpen) {
        window.scrollTo({ top: overviewScrollY, behavior: 'auto' });
        if (lastItem) document.getElementById(view.opener(lastItem))?.focus({ preventScroll: true });
    }
}

function figureHtml(project, key, lang, forceWide) {
    const fig = project.figures && project.figures[key];
    if (!fig) return '';
    const caption = fig.caption[lang] || fig.caption.fr;
    const wide = forceWide || fig.wide;
    return `
        <figure class="case-figure${wide ? ' is-wide' : ''}">
            <a href="${fig.src}" target="_blank" rel="noopener">
                <img src="${fig.src}" alt="${escapeHtml(caption)}" width="${fig.w}" height="${fig.h}"
                     style="max-width: ${fig.maxWidth || fig.w}px" loading="lazy" decoding="async">
            </a>
            <figcaption>${escapeHtml(caption)}</figcaption>
        </figure>`;
}

function barsHtml(bars) {
    const pct = (v) => `${(v / bars.max) * 100}%`;
    const labelled = new Set(bars.labelled || []);
    const n = bars.items.length;
    // A tick is a number, or { value, label } when the axis shows another unit (e.g. AUC from 0 to 1)
    const tickList = bars.ticks.map(v => (typeof v === 'object' ? v : { value: v, label: String(v) }));
    const gridlines = tickList.map(tk => `<span class="bars-gridline" style="left: ${pct(tk.value)}"></span>`).join('');
    const target = bars.target ? `<span class="bars-target" style="left: ${pct(bars.target.value)}"></span>` : '';
    const ticks = tickList.map(tk => `<span class="bars-tick" style="left: ${pct(tk.value)}">${escapeHtml(tk.label)}</span>`).join('');

    // Every cell is placed explicitly so the overlay (grid + target line) can span all bar rows
    const rows = bars.items.map((item, i) => {
        // Long bars carry their value inside the bar end; short ones just after it
        const inside = item.value / bars.max > 0.6;
        const value = labelled.has(i)
            ? `<span class="bars-value${inside ? ' is-inside' : ''}"${inside ? '' : ` style="left: ${pct(item.value)}"`}>${escapeHtml(item.display)}</span>`
            : '';
        return `
            <span class="bars-label" style="grid-row: ${i + 1}">${escapeHtml(item.label)}</span>
            <span class="bars-track" style="grid-row: ${i + 1}">
                <span class="bars-bar" style="width: ${pct(item.value)}" data-tip="${escapeHtml(item.display)}">${inside ? value : ''}</span>
                ${inside ? '' : value}
            </span>`;
    }).join('');

    return `
        <figure class="case-bars">
            <div class="case-bars-head">
                <figcaption class="case-bars-title">${escapeHtml(bars.title)}</figcaption>
                ${bars.target ? `<span class="case-bars-legend">${escapeHtml(bars.target.label)}</span>` : ''}
            </div>
            <div class="bars-plot">
                <div class="bars-overlay" style="grid-row: 1 / span ${n}" aria-hidden="true">${gridlines}${target}</div>
                ${rows}
                <div class="bars-ticks" style="grid-row: ${n + 1}" aria-hidden="true">${ticks}</div>
            </div>
        </figure>`;
}

function timelineHtml(timeline) {
    const start = Date.parse(timeline.start);
    const span = Date.parse(timeline.end) - start;
    const pct = (date) => `${((Date.parse(date) - start) / span) * 100}%`;
    const n = timeline.items.length;
    const gridlines = timeline.marks.map(m => `<span class="bars-gridline" style="left: ${pct(m.date)}"></span>`).join('');
    // Full month names, and their initial for narrow screens
    const ticks = timeline.marks.map(m => `
        <span class="bars-tick is-start" style="left: ${pct(m.date)}">
            <span class="tick-long">${escapeHtml(m.label)}</span><span class="tick-short">${escapeHtml(m.label.charAt(0))}</span>
        </span>`).join('');
    const rows = timeline.items.map((item, i) => `
        <span class="bars-label" style="grid-row: ${i + 1}">${escapeHtml(item.label)}<span class="bars-sub">${escapeHtml(item.dates)}</span></span>
        <span class="bars-track" style="grid-row: ${i + 1}">
            <span class="bars-bar is-span" style="left: ${pct(item.from)}; width: calc(${pct(item.to)} - ${pct(item.from)})" data-tip="${escapeHtml(item.dates)}"></span>
        </span>`).join('');

    return `
        <figure class="case-bars case-timeline">
            <div class="case-bars-head">
                <figcaption class="case-bars-title">${escapeHtml(timeline.title)}</figcaption>
            </div>
            <div class="bars-plot">
                <div class="bars-overlay" style="grid-row: 1 / span ${n}" aria-hidden="true">${gridlines}</div>
                ${rows}
                <div class="bars-ticks" style="grid-row: ${n + 1}" aria-hidden="true">${ticks}</div>
            </div>
        </figure>`;
}

function tableHtml(table) {
    return `
        <div class="case-table-wrap">
            <table class="case-table">
                <caption>${escapeHtml(table.caption)}</caption>
                <thead>
                    <tr>${table.columns.map(col => `<th scope="col">${escapeHtml(col)}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    ${table.rows.map((row, i) => `
                        <tr${i === table.highlightRow ? ' class="is-best"' : ''}>
                            ${row.map((cell, j) => j === 0
                                ? `<th scope="row">${escapeHtml(cell)}</th>`
                                : `<td>${escapeHtml(cell)}</td>`).join('')}
                        </tr>`).join('')}
                </tbody>
            </table>
        </div>`;
}

function blocksHtml(blocks, project, lang) {
    return blocks.map(block => {
        if (block.p) return `<p class="case-p">${richText(block.p)}</p>`;
        if (block.note) return `<p class="case-note"><i class="fas fa-circle-info" aria-hidden="true"></i> <span>${richText(block.note)}</span></p>`;
        if (block.list) return `<ul class="case-list">${block.list.map(item => `<li>${richText(item)}</li>`).join('')}</ul>`;
        if (block.flow) {
            return `<ol class="case-flow">${block.flow.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol>`;
        }
        if (block.figures) {
            const single = block.figures.length === 1;
            return `<div class="case-figures">${block.figures.map(key => figureHtml(project, key, lang, single)).join('')}</div>`;
        }
        if (block.table) return tableHtml(block.table);
        if (block.bars) return barsHtml(block.bars);
        if (block.timeline) return timelineHtml(block.timeline);
        if (block.steps) {
            return `<ol class="case-steps">${block.steps.map(step => `
                <li class="case-step">
                    <div class="case-step-head">
                        <h4>${escapeHtml(step.title)}</h4>
                        ${step.tag ? `<span class="case-step-tag">${escapeHtml(step.tag)}</span>` : ''}
                    </div>
                    ${blocksHtml(step.blocks || [], project, lang)}
                </li>`).join('')}</ol>`;
        }
        return '';
    }).join('');
}

// Projects without a full case study get sections built from their short fields
function defaultSections(project, c) {
    const sections = [{ title: t('case.context'), blocks: [{ p: c.context }] }];
    if (c.highlights) sections.push({ title: t('case.highlights'), blocks: [{ list: c.highlights }] });
    if (c.results) sections.push({ title: t('case.results'), blocks: [{ table: c.results }] });
    return sections;
}

function renderDetailPage(tabKey, itemId) {
    const view = DETAIL_VIEWS[tabKey];
    const items = view.items();
    const page = document.getElementById(view.page);
    const index = items.findIndex(item => item.id === itemId);
    if (!page || index === -1) return false;

    const item = items[index];
    const lang = getLang();
    const c = item[lang] || item.fr;
    const sections = c.sections || defaultSections(item, c);
    const hasPager = items.length > 1;
    page.dataset.currentId = itemId;

    const hero = item.hero
        ? `<figure class="case-hero-media"><img src="${item.hero.src}" alt="" width="${item.hero.w}" height="${item.hero.h}" decoding="async"></figure>`
        : '';
    const stats = c.stats ? `
        <dl class="case-stats">
            ${c.stats.map(st => `<div class="case-stat"><dt>${escapeHtml(st.label)}</dt><dd>${escapeHtml(st.value)}</dd></div>`).join('')}
        </dl>` : `<div class="card-metric-highlight case-metric">${escapeHtml(c.metric)}</div>`;

    const navLink = (other, dir) => `
        <button type="button" class="case-nav-link is-${dir}" data-detail-id="${other.id}">
            <span class="case-nav-dir">${escapeHtml(t(dir === 'prev' ? 'projects.prev' : 'projects.next'))}</span>
            <span class="case-nav-title">${escapeHtml((other[lang] || other.fr).title)}</span>
        </button>`;
    const pager = hasPager ? `
        <nav class="case-pager" aria-label="${escapeHtml(t('projects.pager'))}">
            ${navLink(items[(index - 1 + items.length) % items.length], 'prev')}
            ${navLink(items[(index + 1) % items.length], 'next')}
        </nav>` : '';

    page.innerHTML = `
        <div class="case-topbar">
            <button type="button" class="case-back" data-detail-back>
                <i class="fas fa-arrow-left" aria-hidden="true"></i> ${escapeHtml(t(view.backKey))}
            </button>
            ${hasPager ? `<span class="case-counter">${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}</span>` : ''}
        </div>

        <div class="case-header">
            <div class="case-meta">
                <span class="card-category-badge">${escapeHtml(c.category)}</span>
                ${c.team ? `<span class="case-team">${escapeHtml(c.team)}</span>` : ''}
            </div>
            <h2 class="case-title" tabindex="-1">${escapeHtml(c.title)}</h2>
            <p class="case-lead">${escapeHtml(c.summary)}</p>
            <div class="card-tech-pills case-stack">${techPillsHtml(item.stack, item.stack.length)}</div>
        </div>

        ${hero}
        ${stats}

        ${sections.map(section => `
            <section class="case-section">
                <h3 class="case-section-title">${escapeHtml(section.title)}</h3>
                ${blocksHtml(section.blocks, item, lang)}
            </section>`).join('')}

        ${!c.sections && item.gallery ? `
            <section class="case-section">
                <h3 class="case-section-title">${escapeHtml(t('case.gallery'))}</h3>
                <div class="case-figures">${item.gallery.map(img => `
                    <figure class="case-figure">
                        <a href="${img.src}" target="_blank" rel="noopener"><img src="${img.src}" alt="${escapeHtml(img.caption[lang])}" loading="lazy" decoding="async"></a>
                        <figcaption>${escapeHtml(img.caption[lang])}</figcaption>
                    </figure>`).join('')}
                </div>
            </section>` : ''}

        ${pager}`;

    return true;
}

/* -------------------------------------------------------------
 * 6. SHARED DIALOG BEHAVIOUR (native <dialog>)
 * ----------------------------------------------------------- */
function showDialog(dialog, opener) {
    dialog._opener = opener || document.activeElement;
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    } else {
        dialog.setAttribute('open', '');
    }
    document.body.classList.add('modal-open');
}

function initDialogs() {
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            // A click on the backdrop targets the dialog element itself
            if (e.target === dialog || e.target.closest('[data-close-dialog]')) {
                dialog.close();
            }
        });

        dialog.addEventListener('close', () => {
            if (!document.querySelector('dialog[open]')) {
                document.body.classList.remove('modal-open');
            }
            dialog.dispatchEvent(new CustomEvent('portfolio:dialogclosed'));
            if (dialog._opener && dialog._opener.isConnected) dialog._opener.focus();
            dialog._opener = null;
        });
    });
}

/* -------------------------------------------------------------
 * 7. PDF RESUME PREVIEW
 * ----------------------------------------------------------- */
function initPdfPreview() {
    const dialog = document.getElementById('pdf-dialog');
    if (!dialog) return;

    const titleEl = dialog.querySelector('.pdf-modal-title');
    const iframe = dialog.querySelector('.pdf-iframe');
    const downloadLink = dialog.querySelector('.pdf-download-btn');
    const externalLink = dialog.querySelector('.pdf-external-btn');
    // Embedded PDF viewers are unreliable on phones and tablets: there, the link opens the file directly
    const canPreview = window.matchMedia('(min-width: 769px) and (pointer: fine)');

    document.querySelectorAll('a[data-preview-pdf]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!canPreview.matches) return;
            e.preventDefault();

            const pdfUrl = link.getAttribute('href');
            const title = getLang() === 'en' ? link.dataset.titleEn : link.dataset.titleFr;
            titleEl.textContent = title;
            iframe.title = title;
            iframe.src = `${pdfUrl}#toolbar=1&navpanes=0&view=FitH`;
            downloadLink.href = pdfUrl;
            externalLink.href = pdfUrl;
            showDialog(dialog, link);
            dialog.querySelector('.pdf-modal-close-btn')?.focus();
        });
    });

    dialog.addEventListener('portfolio:dialogclosed', () => {
        iframe.src = 'about:blank';
    });
}

/* -------------------------------------------------------------
 * 8. KEYBOARD SHORTCUTS FOR NAVIGATION
 * ----------------------------------------------------------- */
function initKeyboardShortcuts() {
    const tabOrder = ['profile', 'projects', 'experience', 'education', 'skills'];

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
        if (document.querySelector('dialog[open]')) return;
        if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable="true"]')) return;

        const index = ['1', '2', '3', '4', '5'].indexOf(e.key);
        if (index !== -1 && window.switchTab) {
            window.switchTab(tabOrder[index]);
        }
    });
}
