---
title: 0和1的把戏
date: '2014-11-10'
tags: ['算法']
path: tricks-with-one-and-zero
spoiler: 世界上有两种算法题，一种让人说“卧槽”，另一种让人说“这尼玛”。
---

要分享的两个算法题都是用关于`位`的知识求解的，先透露一下。  
首先来看第 1 道题：

---

### Single Number

Given an array of integers, every element appears twice except for one. Find that single one.

**Note**:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

---

题目给定一个整数数组，数组中除了一个整数外，其他都是成对出现的，要求得到那个特别的数。初看起来题目非常简单，排个序就好了，然后遍历一遍，这是大部分人最直观的想法，包括我，但是排序的最好复杂度为`nlogn`，再加上`O(n)`的遍历时间，结果一定为非线性时间。  
题目希望能够`linear runtime`时间内完成，那么仅有一次遍历的机会。所以一定要在这次遍历的时候做一下文章。

**题解:**  
遍历数组，直接异或！ 相同为 0，相异为 1。举个例子，3，4，3。这三个数异或，可以先将 3 和 3 异或，相同的数异或之后，结果为 0，然后再与 4 异或，0 与任何数异或结果不变。得到的结果为 4.  
代码如下（java）：

```java
public int singleNumber(int[] A) {
  int result = A[0];
  for (int i = 1; i < A.length; i++) {
    result = result ^ A[i];
  }
  return result;
}
```

## 接下来看第二道题：

### Single Number II

Given an array of integers, every element appears _three_ times except for one. Find that single one.

**Note:**
Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

---

和第一道题大同小异，只不过是相同的个数由 2 变为 3 了。思路肯定还是在一次遍历的时候完成所有工作，但是这次不能简单的异或了，因为三次的话直接以后又出问题了。

**题解：**  
回过头来再看看第一道题，其实，在异或的时候，我们做的工作是，遇到第一个 3，记住这个 3 遇到一次，记为 1，当再次遇到 3 得时候，将再记录一次 3 遇到了两次，于是我们将 1 改为 0.注意，这里，我们使用了一个 bit 来表示 2 种状态。对于第二题来说，我们也可以使用这样的思路，不过这里有三个状态，所以我们至少使用 2 个 bit 来表示，到第一次遇到时候，记作 10，当第二次遇到时，记作 01，当第三次遇到时，记作 00。状态变化为`00->10->01->00(0->1->2->3)`。  
代码如下（C++）：

```cpp
int singleNumber(int A[], int n) {
  int ones = 0;
  int twos = 0;
  for (int i = 0; i < n; i++) {
    ones = (ones ^ A[i]) & (~twos);
    twos = (twos ^ A[i]) & (~ones);
  }
  return ones;
}
```
