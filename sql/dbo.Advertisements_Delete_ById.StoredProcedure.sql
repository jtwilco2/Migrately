CREATE proc [dbo].[Advertisements_Delete_ById]
		@Id int

As

/*******************TEST CODE*******************

DECLARE @id int = 8

EXECUTE [dbo].[Advertisements_Delete_ById]
		@Id

***********************************************/

Begin

DELETE FROM [dbo].[Advertisements]
      WHERE Id = @Id

End


GO
