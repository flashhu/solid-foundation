# 第k大(小)的元素

### [二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)

利用二叉搜索树特性，套用中序遍历解法，改变顺序为 右，中，左，第k位即为结果

```javascript
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {
    const stack = []
    let curr = root
    let num = 0
    while(stack.length || curr) {
        while(curr) {
            stack.push(curr)
            curr = curr.right
        }
        const node = stack.pop()
        num ++
        if(num === k) return node.val
        if(node.left) {
            curr = node.left
    }
};

```

### [二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

> 牛客中，返回整个节点
>
> 力扣中，返回节点值

利用二叉搜索树特性，中序遍历序列的第k位即第k小元素

```javascript
/**
 * 相比上种，缩减部分变量
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    const stack = []
    while (true) {
        while (root) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        k--
        if (k === 0) return root.val
        root = root.right
    }
};
```

