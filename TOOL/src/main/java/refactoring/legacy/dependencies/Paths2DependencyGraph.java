package refactoring.legacy.dependencies;

import bpmn.graph.Node;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

public class Paths2DependencyGraph
{
	public static DependencyGraph transform(Collection<ArrayList<Node>> paths)
	{
		final DependencyGraph dependencyGraph = new DependencyGraph();
		final HashMap<Node, Node> nodeCorrespondence = new HashMap<>();

		for (ArrayList<Node> path : paths)
		{
			final Node firstNode = path.remove(0);
			final Node tempFirstNode = nodeCorrespondence.get(firstNode);
			final Node newFirstNode;

			if (tempFirstNode == null)
			{
				newFirstNode = firstNode.weakCopy();
				nodeCorrespondence.put(firstNode, newFirstNode);
				dependencyGraph.addInitialNode(newFirstNode);
			}
			else
			{
				newFirstNode = tempFirstNode;
			}

			Paths2DependencyGraph.addPathToGraph(path, newFirstNode, nodeCorrespondence);
		}

		return dependencyGraph;
	}

	//Private methods

	private static void addPathToGraph(final ArrayList<Node> path,
									   final Node initialNode,
									   final HashMap<Node, Node> nodeCorrespondence)
	{
		Node currentNode = initialNode;

		for (Node node : path)
		{
			final Node nodeInGraph = nodeCorrespondence.computeIfAbsent(node, n -> node.weakCopy());
			currentNode.addChild(nodeInGraph);
			nodeInGraph.addParent(currentNode);
			currentNode = nodeInGraph;
		}
	}
}
