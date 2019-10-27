---
title: 'Hello World!'
date: 2014-10-14 23:49:53
tags: ['荒唐言']
path: hello-world
---

> 我觉得程序员这个群体是非常幸运的一群人，我们生在一个技术改变世界的时代，而我们可能正做着能够改变世界的技术，这是何等的荣耀和机遇。 ——《MacTalk 人生元编程》

<!--more-->

### 前言

大概每个程序员在开篇都会写一个`Hello World!`来作为开始。这是我的第一篇博客，就来写一写程序员眼中的`Hello World!`。

### 这是一个 01 的世界

每个伟大的梦想都来自最小的尝试。秒写一个代码：`hello.c`

```c
#include <stdio.h>

int main()
{
    printf("Hello world\n");
    return 0;
}
```

这段代码相信大家都很熟悉，无非就是输出一个`Hello world`字符串。下面我们就来分析一下这段代码。  
1 预处理阶段  
我们可以使用`gcc -E hello.c -o hello.i`来将预处理之后的数据存到`hello.i`中，或者使用`>`重定向到指定的文件，预处理的结果比较简单，大家可以直接看输出的结果。
2 编译阶段  
`gcc -S hello.i -o hello.s`将预处理之后的文件编译成`hello.s`文件。  
在编译阶段，编译器检查代码的规范性、是否有语法错误等，在检查无误后，gcc 把代码翻译成汇编语言。
我们来看一下编译之后的文件
`>more hello.s`

```c
    .file	"hello.c"
.section	.rodata
.LC0:
    .string	"Hello world"
    .text
    .globl	main
    .type	main, @function
main:
.LFB0:
    .cfi_startproc
    pushq	%rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    movq	%rsp, %rbp
    .cfi_def_cfa_register 6
    movl	$.LC0, %edi
    call	puts
    movl	$0, %eax
    popq	%rbp
    .cfi_def_cfa 7, 8
    ret
    .cfi_endproc
.LFE0:
    .size	main, .-main
    .ident	"GCC: (Ubuntu 4.8.2-19ubuntu1) 4.8.2"
    .section	.note.GNU-stack,"",@progbits
```

3 汇编阶段  
汇编阶段将编译阶段生成的`.s`文件转成二进制目标代码。
`gcc -c hello.s -o hello.o`
生成了`.o`二进制文件，这时就不能使用`more`来进行文本查看了，可以使用`objdump`命令。
`objdump -d hello.o`

```c
hello.o:     file format elf64-x86-64

Disassembly of section .text:

0000000000000000 <main>:
   0:	55                   	push   %rbp
   1:	48 89 e5             	mov    %rsp,%rbp
   4:	bf 00 00 00 00       	mov    $0x0,%edi
   9:	e8 00 00 00 00       	callq  e <main+0xe>
   e:	b8 00 00 00 00       	mov    $0x0,%eax
  13:	5d                   	pop    %rbp
  14:	c3                   	retq
```

我们可以看到，`main`函数的汇编代码。

4 链接阶段
最后就是链接啦，将`.o`文件链接成可执行文件  
`gcc hello.o -o hello`
我们仍然使用`objdump`命令来查看`hello`文件
`objdump -d hello`  
输出比较长，我们截取 main 函数的部分来看

```c
000000000040052d <main>:
  40052d:	55                   	push   %rbp
  40052e:	48 89 e5             	mov    %rsp,%rbp
  400531:	bf d4 05 40 00       	mov    $0x4005d4,%edi
  400536:	e8 d5 fe ff ff       	callq  400410 <puts@plt>
  40053b:	b8 00 00 00 00       	mov    $0x0,%eax
  400540:	5d                   	pop    %rbp
  400541:	c3                   	retq
  400542:	66 2e 0f 1f 84 00 00 	nopw   %cs:0x0(%rax,%rax,1)
  400549:	00 00 00
  40054c:	0f 1f 40 00          	nopl   0x0(%rax)
```

最后执行

```bash
>./hello
Hello world
```

---

到现在我们只是从一个`Hello World`程序的输出结果走马观花了一下程序运行的过程，对于过程中的每一个文件分析并没有写出，算是留一点神秘感吧，从程序数据组织，包括代码段、数据段等，到汇编代码的底层实现，计算机有着太多的东西让我们去发现和思考。正如开头所说，生在这样的一个时代是非常幸运的。但行好事，莫问前程，出发！
