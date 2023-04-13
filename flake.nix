{
  description = "Node development";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    inputs @ { self
    , nixpkgs
    , flake-utils
    , ...
    }:
    flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs {
        inherit system;
        overlays = [ ];
      };
    in
    rec {
      # packages.hello =
      # defaultPackage = packages.hello;
      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs-18_x
          yarn
        ];
      };
    });
}
