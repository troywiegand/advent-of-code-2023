{
  description = "shell convert flake";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShell = pkgs.mkShell {
        name = "advent-of-code-2023";

        buildInputs = with pkgs; [
          bun
        ];

	shellHook = ''
          echo "Welcome in $name"
          bun install
        '';
      };
    }
  );
}
