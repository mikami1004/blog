const codeBlocks = document.querySelectorAll('.highlighter-rouge .code-header, .highlight + .code-header');
const copyCodeButtons = document.querySelectorAll('.copy-code-button');

copyCodeButtons.forEach((copyCodeButton, index) => {
    const code = codeBlocks[index].innerText;

    copyCodeButton.addEventListener('click', () => {
        // クリップボードにコードをコピー
        window.navigator.clipboard.writeText(code);

        // ボタンのテキストを更新
        const {innerText: originalText } = copyCodeButton;
        copyCodeButton.innerText = 'Copied!';

        // コピーしたときにクラス追加
        copyCodeButton.classList.add('copied');
        // ２秒後元に戻る
        setTimeout(() => {
            copyCodeButton.innerText = originalText;
            copyCodeButton.classList.remove('copied');
        }, 2000);
    });
});