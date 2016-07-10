var gouraudFragmentShaderText =
[
"#version 400",
"",
"varying vec4 vColor;",
"",
"void main(void)",
"{",
"  gl_FragColor = vColor;",
"}",
].join("\n");
