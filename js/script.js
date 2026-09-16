const cabecalho = document.querySelector('.cabecalho');
const menu = document.querySelector('.menu');
const botaoMenu = document.querySelector('.menu-botao');
const linksMenu = document.querySelectorAll('.menu a');
const secoes = document.querySelectorAll('main section[id]');

function fecharMenu() {
    menu.classList.remove('aberto');
    botaoMenu.classList.remove('ativo');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-aberto');
}

botaoMenu.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botaoMenu.classList.toggle('ativo', aberto);
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-aberto', aberto);
});

linksMenu.forEach((link) => link.addEventListener('click', fecharMenu));

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fecharMenu();
});

function atualizarNavegacao() {
    cabecalho.classList.toggle('rolagem', window.scrollY > 20);
    let atual = 'inicio';

    secoes.forEach((secao) => {
        if (window.scrollY >= secao.offsetTop - 180) atual = secao.id;
    });

    linksMenu.forEach((link) => {
        link.classList.toggle('ativo', link.getAttribute('href') === `#${atual}`);
    });
}

window.addEventListener('scroll', atualizarNavegacao, { passive: true });
atualizarNavegacao();

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.revelar').forEach((elemento, indice) => {
    elemento.style.transitionDelay = `${Math.min(indice % 4, 3) * 70}ms`;
    observador.observe(elemento);
});

document.querySelector('#ano').textContent = new Date().getFullYear();
