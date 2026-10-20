'use strict';
const settings = window.PORTFOLIO || {};
const username = settings.githubUsername || 'appolopgs';
const limit = Math.min(100, Math.max(1, Number(settings.repositoryLimit) || 12));
const grid = document.getElementById('repo-grid');
const count = document.getElementById('repo-count');
let repositories = [];
let activeFilter = 'all';
document.getElementById('year').textContent = new Date().getFullYear();
function message(text, withLink = false) {
  grid.replaceChildren();
  const p = document.createElement('p');
  p.className = 'repo-message';
  p.append(document.createTextNode(text));
  if (withLink) {
    const link = document.createElement('a');
    link.href = `https://github.com/${encodeURIComponent(username)}?tab=repositories`;
    link.textContent = ' GitHub에서 저장소 보기 ↗';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    p.append(document.createElement('br'), link);
  }
  grid.append(p);
}
function render() {
  const visible = repositories.filter(repo => activeFilter === 'all' || (activeFilter === 'fork' ? repo.fork : !repo.fork));
  count.textContent = `${String(visible.length).padStart(2, '0')} REPOSITORIES`;
  grid.replaceChildren();
  if (!visible.length) return message('이 조건에 해당하는 공개 저장소가 없습니다.', true);
  for (const [index, repo] of visible.entries()) {
    const card = document.createElement('a');
    card.className = 'repo-card';
    card.href = `https://github.com/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}`;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    const top = document.createElement('div'); top.className = 'repo-top';
    const icon = document.createElement('span'); icon.textContent = '⌘'; icon.setAttribute('aria-hidden', 'true');
    const number = document.createElement('span'); number.textContent = `${repo.fork ? 'FORK / ' : ''}${String(index + 1).padStart(2, '0')} ↗`;
    top.append(icon, number);
    const title = document.createElement('h3'); title.textContent = repo.name;
    const description = document.createElement('p'); description.textContent = repo.description || 'GitHub에서 코드와 프로젝트 내용을 확인해 보세요.';
    const meta = document.createElement('div'); meta.className = 'repo-meta';
    for (const label of [repo.language || 'Repository', `☆ ${repo.stargazers_count || 0}`, new Intl.DateTimeFormat('ko-KR', {year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(repo.updated_at))]) {
      const span = document.createElement('span'); span.textContent = label; meta.append(span);
    }
    card.append(top, title, description, meta); grid.append(card);
  }
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  if (repositories.length) render();
}));
async function loadRepositories() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&direction=desc&per_page=${limit}`, {signal:controller.signal, headers:{Accept:'application/vnd.github+json'}});
    if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid repository response');
    repositories = data;
    render();
  } catch (error) {
    count.textContent = 'GITHUB / PUBLIC';
    message('공개 저장소를 불러오지 못했습니다. 잠시 후 다시 방문하거나 GitHub에서 확인해 주세요.', true);
  } finally {
    clearTimeout(timeout);
    grid.setAttribute('aria-busy', 'false');
  }
}
loadRepositories();
